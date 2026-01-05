import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // SSR только для страницы входа (для SEO и быстрой первой загрузки)
  /* {
    path: 'signIn',
    renderMode: RenderMode.Server,
  }, */
  // Все остальные роуты (включая /tests/**) - только в браузере
  // Это оптимально для защищённых страниц, так как:
  // 1. Нет смысла рендерить на сервере то, что требует авторизации
  // 2. Снижается нагрузка на Node.js сервер
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
