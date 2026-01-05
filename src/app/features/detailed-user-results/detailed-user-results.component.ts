import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { UserResultsRequestService } from './user-results-request.service';
import { TuiPagination } from '@taiga-ui/kit';
import { TuiButton, TuiDialogService, TuiDropdown, TuiRoot } from '@taiga-ui/core';
import { POPOUT_PAGINATION_DATA, PopoutPaginationData } from '../popout/popout-data.token';
import { PopoutService } from '../popout/popout.service';
import { TakeIds } from '@shared/interfaces/commons/ids/ids.interface';
import { UserTestDetails } from './user-test-details.interface';

@Component({
  selector: 'app-detailed-user-results',
  imports: [TuiPagination, TuiDropdown, TuiRoot, TuiButton, TuiRoot],
  providers: [UserResultsRequestService],
  templateUrl: './detailed-user-results.component.html',
  styleUrl: './detailed-user-results.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedUserResultsComponent {
  private popoutService = inject(PopoutService);
  private userResultsRequestService = inject(UserResultsRequestService);
  private readonly dialogs = inject(TuiDialogService);

  // Попытка получить данные пагинации из токена (popout режим)
  private popoutPaginationDataSignal: Signal<PopoutPaginationData> = inject(POPOUT_PAGINATION_DATA);

  // Computed сигналы для работы с данными пагинации
  currentPopoutData = computed(() => {
    const paginationData = this.popoutPaginationDataSignal();
    return paginationData.items[paginationData.currentIndex] ?? null;
  });

  currentIndex = computed(() => {
    return this.popoutPaginationDataSignal?.()?.currentIndex ?? 0;
  });

  totalItems = computed(() => {
    return this.popoutPaginationDataSignal?.()?.items.length ?? 0;
  });

  // Данные для компонента (реактивные)
  userName = signal<string | undefined>(undefined);

  // Флаг режима работы
  isPopoutMode = false;

  // Данные детальных результатов
  userTestDetails = signal<UserTestDetails | null>(null);

  constructor() {
    this.isPopoutMode = true;

    // Эффект для обновления данных при изменении currentPopoutData
    effect(() => {
      const currentData = this.currentPopoutData();
      if (currentData) {
        // this.testId.set(currentData.testId);
        // this.sessionId.set(currentData.sessionId);
        // this.takeId.set(currentData.takeId);
        this.userName.set(currentData.userName);
        if (!currentData.testId || !currentData.sessionId || !currentData.takeId) {
          return;
        }
        // Загружаем данные при изменении takeId
        this.loadUserTestDetails({
          testId: currentData.testId,
          sessionId: currentData.sessionId,
          takeId: currentData.takeId,
        });
      }
    });
  }

  /**
   * Обработчик изменения страницы в пагинации
   */
  onPageChange(index: number): void {
    // if (this.isPopoutMode) {
    this.popoutService.switchToTakeId(index);
    // }
  }

  /**
   * Получает имя пользователя по индексу
   */
  getUserNameByIndex(index: number): string {
    const paginationData = this.popoutPaginationDataSignal();
    if (!paginationData || !paginationData.items[index]) {
      return '';
    }
    return paginationData.items[index].userName || `User ${index + 1}`;
  }

  /**
   * Получает имя сессии по индексу
   */
  getSessionNameByIndex(index: number): string {
    const paginationData = this.popoutPaginationDataSignal();
    if (!paginationData || !paginationData.items[index]) {
      return '';
    }
    return `Название сеанса: ${paginationData.items[index].sessionName}`;
  }

  /**
   * Загружает детальные результаты пользователя
   */
  private loadUserTestDetails(ids: TakeIds): void {
    this.userResultsRequestService.getUserTestDetails(ids).subscribe(details => this.userTestDetails.set(details));
  }

  protected showDialog(): void {
    this.dialogs
      .open('<div>This is a plain string dialog.</div>It supports basic <strong>HTML</strong>', {
        label: 'Heading',
        size: 's',
      })
      .subscribe();
  }

  protected showDialogWithCustomButton(): void {
    this.dialogs
      .open('Good, Anakin, Good!', {
        label: 'Star wars. Episode III',
        size: 's',
        data: { button: 'Do it!' },
      })
      .subscribe();
  }
}
