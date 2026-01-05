import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/starting-page/starting-page.component').then(c => c.StartingPageComponent),
  },
  {
    path: 'sessions-statistics',
    loadComponent: () =>
      import('./features/sessions-statistics/sessions-statistics.component').then(c => c.SessionsStatisticsComponent),
  },
];
