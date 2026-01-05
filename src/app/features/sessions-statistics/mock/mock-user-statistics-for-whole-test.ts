import { Results } from '@shared/models';
import { Uuid } from '@shared/types/uuid.type';
import { firstUserData, secondUserData, thirdUserData } from './mock-test-sessions-data';

//uuid тут - это userId. Это данные для модалки. (я упростил запрос, ведь в реальности там 3 uuid, но для примера - достаточно одного - по юзеру)
export const userStatisticsForWholeTest = new Map<Uuid, Results.TestSessionsView[]>([
  ['7d937a55-5497-463f-95ce-c8fbe6ad15b6', firstUserData],
  ['89633e5e-2e64-4880-981a-5a1d8ecd68cb', secondUserData],
  ['48c5a9d7-5e66-4748-a817-2b41bcf73a00', thirdUserData],
]);
