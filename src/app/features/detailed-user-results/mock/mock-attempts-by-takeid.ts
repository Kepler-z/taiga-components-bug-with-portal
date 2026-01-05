import { Uuid } from '@shared/types/uuid.type';
import { fifthAttemt, firstAttempt, fourthAttemt, secondAttemt, thirdAttemt } from './mock-attempts';
import { UserTestDetails } from '../user-test-details.interface';

// uuid тут - takeId (то есть id попытки). Я сюда попытки всех пользователей свалил чисто для примера, ведь по сути не важно, откуда моковые данные беру
export const mockAttemptsByTakeId = new Map<Uuid, UserTestDetails>([
  ['aa45bcd7-096a-4e59-bd2e-eb6e81621910', firstAttempt],
  ['41245d05-be61-4c72-badc-5131c3b5d2e5', secondAttemt],
  ['e52fca1c-1ab4-4447-9854-02ba59a68053', thirdAttemt],
  ['82b8f7b3-8fe4-4d54-8502-438a1d7257db0', fourthAttemt],
  ['8a658ae8-4286-45f2-8453-0531c4a94950', fifthAttemt],
]);

export const mockDefaultAttempt = {
  points100: 0,
  points5: 0,
  duration: '00:00:00',
  rightAnswers: 0,
  tasksCount: 0,
  tasksResults: [],
};
