import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  signal,
  Type,
  WritableSignal,
} from '@angular/core';
import { DomPortalOutlet } from '@angular/cdk/portal';
import { EmbeddedViewRef } from '@angular/core';
import { PopoutData, PopoutPaginationData, POPOUT_PAGINATION_DATA } from './popout-data.token';

@Injectable({
  providedIn: 'root',
})
export class PopoutService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  // Отслеживание состояния popout вкладки
  private popoutWindowRef: Window | null = null;
  private popoutComponentRef: ComponentRef<unknown> | null = null;
  private popoutDataSignal: WritableSignal<PopoutPaginationData> | null = null;
  private windowCloseCheckInterval: ReturnType<typeof setInterval> | null = null;
  private popoutWindowRefs = new Set<Window>(); // Отслеживание всех открытых окон
  private portalOutlet: DomPortalOutlet | null = null; // Ссылка на portal outlet для очистки
  private isInitializing = false; // Флаг для предотвращения двойной инициализации

  /**
   * Открывает компонент в новой вкладке браузера без повторного запуска Angular приложения
   * Если вкладка уже открыта, добавляет новый takeId или переключается на существующий
   * @param component - Компонент для отображения
   * @param data - Данные для передачи в компонент через InjectionToken
   * @param _injectionToken - Токен для инжекции данных в компонент (используется только при создании новой вкладки)
   */
  openInNewTab<T, D>(component: Type<T>, data: D, _injectionToken: InjectionToken<D>): void {
    // Проверяем наличие открытых окон из Set
    const openWindow = this.findOpenWindow();

    if (openWindow && this.popoutDataSignal) {
      // Вкладка уже открыта - добавляем или переключаемся на takeId
      // Преобразуем data в PopoutData (предполагаем, что это PopoutData, так как используется POPOUT_DATA)
      this.popoutWindowRef = openWindow; // Обновляем ссылку на активное окно
      this.addOrSwitchToTakeId(data as PopoutData);
      return;
    }

    // Очищаем закрытые окна из Set перед созданием нового
    this.cleanupClosedWindows();

    // Создаем новую вкладку (для этого сделали пустой .html, который хранится в папке assets)
    const windowRef = window.open('assets/tabs/popout.html', '_blank');

    if (!windowRef) {
      console.error('Не удалось открыть новую вкладку. Возможно, браузер заблокировал всплывающее окно.');
      return;
    }

    // Создаем начальные данные пагинации
    const initialData: PopoutPaginationData = {
      items: [data as PopoutData],
      currentIndex: 0,
    };
    const paginationSignal = signal<PopoutPaginationData>(initialData);
    this.popoutDataSignal = paginationSignal;

    // Ждем загрузки документа в новой вкладке
    const initializeHandler = () => {
      if (!this.isInitializing) {
        this.initializeComponentInWindow(windowRef, component, paginationSignal, POPOUT_PAGINATION_DATA);
      }
    };

    // Всегда добавляем обработчик для надежности
    windowRef.addEventListener('DOMContentLoaded', initializeHandler, { once: true });

    // И пробуем синхронно с небольшой задержкой
    setTimeout(() => {
      if (!this.isInitializing && !this.popoutComponentRef) {
        initializeHandler();
      }
    }, 50);
  }

  /**
   * Добавляет новый takeId в массив или переключается на существующий
   */
  addOrSwitchToTakeId(data: PopoutData): void {
    if (!this.popoutDataSignal) {
      console.error('Попытка добавить takeId, но popout вкладка не открыта');
      return;
    }

    const currentData = this.popoutDataSignal();
    const existingIndex = currentData.items.findIndex(item => item.takeId === data.takeId);

    if (existingIndex !== -1) {
      // Такой takeId уже существует - переключаемся на него
      this.popoutDataSignal.update(prev => ({
        ...prev,
        currentIndex: existingIndex,
      }));
    } else {
      // Новый takeId - добавляем в массив и переключаемся на него
      this.popoutDataSignal.update(prev => ({
        items: [...prev.items, data],
        currentIndex: prev.items.length,
      }));
    }
  }

  /**
   * Переключается на takeId по индексу (для использования из компонента при пагинации)
   */
  switchToTakeId(index: number): void {
    if (!this.popoutDataSignal) {
      console.error('Попытка переключить takeId, но popout вкладка не открыта');
      return;
    }

    const currentData = this.popoutDataSignal();
    if (index < 0 || index >= currentData.items.length) {
      console.error(`Индекс ${index} вне диапазона [0, ${currentData.items.length})`);
      return;
    }

    this.popoutDataSignal.update(prev => ({
      ...prev,
      currentIndex: index,
    }));
  }

  /**
   * Закрывает popout вкладку и очищает все ресурсы
   */
  closePopout(): void {
    // Закрываем все открытые окна из Set
    for (const windowRef of this.popoutWindowRefs) {
      if (windowRef && !windowRef.closed) {
        windowRef.close();
      }
    }

    this.cleanup();
  }

  /**
   * Проверяет, открыта ли popout вкладка
   */
  isPopoutOpen(): boolean {
    // Очищаем закрытые окна перед проверкой
    this.cleanupClosedWindows();
    return this.popoutWindowRefs.size > 0;
  }

  /**
   * Находит открытое окно из Set
   */
  private findOpenWindow(): Window | null {
    for (const windowRef of this.popoutWindowRefs) {
      if (windowRef && !windowRef.closed) {
        return windowRef;
      }
    }
    return null;
  }

  /**
   * Очищает закрытые окна из Set
   */
  private cleanupClosedWindows(): void {
    const closedWindows: Window[] = [];
    for (const windowRef of this.popoutWindowRefs) {
      if (!windowRef || windowRef.closed) {
        closedWindows.push(windowRef);
      }
    }
    closedWindows.forEach(window => this.popoutWindowRefs.delete(window));

    // Если активное окно закрыто, очищаем ссылку
    if (this.popoutWindowRef && this.popoutWindowRef.closed) {
      this.popoutWindowRef = null;
    }

    // Если все окна закрыты, очищаем signal
    if (this.popoutWindowRefs.size === 0) {
      this.popoutDataSignal = null;
    }
  }

  /**
   * Очищает все ресурсы
   */
  private cleanup(): void {
    if (this.windowCloseCheckInterval) {
      clearInterval(this.windowCloseCheckInterval);
      this.windowCloseCheckInterval = null;
    }

    if (this.popoutComponentRef) {
      this.appRef.detachView(this.popoutComponentRef.hostView);
      this.popoutComponentRef.destroy();
      this.popoutComponentRef = null;
    }

    if (this.portalOutlet) {
      this.portalOutlet.dispose();
      this.portalOutlet = null;
    }

    // Очищаем закрытые окна из Set
    this.cleanupClosedWindows();

    // Очищаем ссылку на активное окно только если оно закрыто
    if (this.popoutWindowRef && this.popoutWindowRef.closed) {
      this.popoutWindowRef = null;
    }

    // Очищаем signal только если все окна закрыты
    if (this.popoutWindowRefs.size === 0) {
      this.popoutDataSignal = null;
    }

    // Сбрасываем флаг инициализации
    this.isInitializing = false;
  }

  /**
   * Инициализирует компонент в новой вкладке
   */
  private initializeComponentInWindow<T, D>(
    windowRef: Window,
    component: Type<T>,
    data: D,
    injectionToken: InjectionToken<D>
  ): void {
    // Проверяем флаг инициализации для предотвращения двойной инициализации
    if (this.isInitializing) {
      console.warn('Попытка инициализировать компонент, пока уже идет инициализация');
      return;
    }

    // Проверяем, не закрыто ли окно
    if (windowRef.closed) {
      console.warn('Попытка инициализировать компонент в закрытом окне');
      return;
    }

    this.isInitializing = true;

    try {
      // Сохраняем ссылку на окно
      this.popoutWindowRef = windowRef;
      // Добавляем окно в Set для отслеживания
      this.popoutWindowRefs.add(windowRef);

      // Копируем все стили из основного приложения
      this.copyStyles(document, windowRef.document);

      // Создаем DomPortalOutlet в body новой вкладки
      const portalOutlet = new DomPortalOutlet(windowRef.document.body, undefined, this.appRef, this.injector);
      // Сохраняем ссылку на portalOutlet
      this.portalOutlet = portalOutlet;

      // Создаем инжектор с данными
      const customInjector = Injector.create({
        providers: [
          {
            provide: injectionToken,
            useValue: data,
          },
        ],
        parent: this.injector,
      });

      // Создаем компонент с кастомным инжектором
      const componentRef: ComponentRef<T> = createComponent(component, {
        environmentInjector: this.injector,
        elementInjector: customInjector,
      });

      // Сохраняем ссылку на компонент
      this.popoutComponentRef = componentRef;

      // Прикрепляем компонент к ApplicationRef для change detection
      this.appRef.attachView(componentRef.hostView);

      // Вставляем компонент в DOM новой вкладки
      const componentElement = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
      windowRef.document.body.appendChild(componentElement);

      // Настраиваем обработчик закрытия окна для очистки ресурсов
      this.setupWindowCloseHandler(windowRef, componentRef, portalOutlet);

      // Сбрасываем флаг инициализации после успешного завершения
      this.isInitializing = false;
    } catch (error) {
      // В случае ошибки сбрасываем флаг и очищаем ресурсы
      this.isInitializing = false;
      console.error('Ошибка при инициализации компонента в popout окне:', error);
      // Очищаем окно из Set если инициализация не удалась
      this.popoutWindowRefs.delete(windowRef);
      if (this.popoutWindowRef === windowRef) {
        this.popoutWindowRef = null;
      }
      throw error;
    }
  }

  /**
   * Копирует все стили из исходного документа в целевой
   */
  private copyStyles(sourceDoc: Document, targetDoc: Document): void {
    // Копируем все <style> теги
    const styles = sourceDoc.querySelectorAll('style');
    styles.forEach(style => {
      const newStyle = targetDoc.createElement('style');
      newStyle.textContent = style.textContent;
      targetDoc.head.appendChild(newStyle);
    });

    // Копируем все <link rel="stylesheet"> теги
    const links = sourceDoc.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      const newLink = targetDoc.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.href = (link as HTMLLinkElement).href;
      targetDoc.head.appendChild(newLink);
    });
  }

  /**
   * Настраивает обработчик закрытия окна для очистки ресурсов
   */
  private setupWindowCloseHandler<T>(
    windowRef: Window,
    componentRef: ComponentRef<T>,
    portalOutlet: DomPortalOutlet
  ): void {
    // Проверяем закрытие окна каждую секунду
    this.windowCloseCheckInterval = setInterval(() => {
      if (windowRef.closed) {
        // Удаляем окно из Set
        this.popoutWindowRefs.delete(windowRef);
        // Очищаем portalOutlet для этого конкретного окна
        if (this.portalOutlet === portalOutlet) {
          portalOutlet.dispose();
          this.portalOutlet = null;
        }
        // Очищаем компонент
        if (this.popoutComponentRef === componentRef) {
          this.appRef.detachView(componentRef.hostView);
          componentRef.destroy();
          this.popoutComponentRef = null;
        }
        // Если это было активное окно, очищаем ссылку
        if (this.popoutWindowRef === windowRef) {
          this.popoutWindowRef = null;
        }
        // Если все окна закрыты, очищаем signal
        if (this.popoutWindowRefs.size === 0) {
          this.popoutDataSignal = null;
        }
      }
    }, 1000);

    // Также обрабатываем событие beforeunload в новой вкладке
    windowRef.addEventListener('beforeunload', () => {
      // Удаляем окно из Set
      this.popoutWindowRefs.delete(windowRef);
      // Очищаем portalOutlet для этого конкретного окна
      if (this.portalOutlet === portalOutlet) {
        portalOutlet.dispose();
        this.portalOutlet = null;
      }
      // Очищаем компонент
      if (this.popoutComponentRef === componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        this.popoutComponentRef = null;
      }
      // Если это было активное окно, очищаем ссылку
      if (this.popoutWindowRef === windowRef) {
        this.popoutWindowRef = null;
      }
      // Если все окна закрыты, очищаем signal
      if (this.popoutWindowRefs.size === 0) {
        this.popoutDataSignal = null;
      }
    });
  }
}
