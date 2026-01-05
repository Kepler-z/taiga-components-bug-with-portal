import { InjectionToken, Signal } from '@angular/core';
import { Uuid } from '@shared/types/uuid.type';

export interface PopoutData {
  testId: Uuid;
  sessionId: Uuid;
  takeId: Uuid;
  userName?: string;
  sessionName?: string;
}

export interface PopoutPaginationData {
  items: PopoutData[]; // Массив всех открытых takeId
  currentIndex: number; // Текущий активный индекс
}

export const POPOUT_DATA = new InjectionToken<PopoutData>('POPOUT_DATA');
export const POPOUT_PAGINATION_DATA = new InjectionToken<Signal<PopoutPaginationData>>('POPOUT_PAGINATION_DATA');
