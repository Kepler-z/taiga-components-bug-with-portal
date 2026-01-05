import { Uuid } from '@shared/types/uuid.type';

export interface SessionIds {
  testId: Uuid;
  sessionId: Uuid;
}

export interface TakeIds extends SessionIds {
  takeId: Uuid;
}
