import { Results } from '@shared/models';

export const mockUsersListData: Results.Division[] = [
  {
    id: '07b87a76-130a-4fa1-889d-b3d01d6fa59b',
    shortName: 'Класс 143',
    fullName: 'Учебный класс 143',
    usersResults: [
      {
        userId: '7d937a55-5497-463f-95ce-c8fbe6ad15b6',
        userName: 'Тестирович Тест Тестовый',
        takesCount: 1,
        lastTakeDuration: '00:03',
        maxPoints: 0,
        avrPoints: 0,
        minPoints: 0,
      },
    ],
  },
  {
    id: '6e576532-a75d-4be7-8758-6945225a8d32',
    shortName: 'Класс 125',
    fullName: 'Учебный класс 125',
    usersResults: [
      {
        userId: '89633e5e-2e64-4880-981a-5a1d8ecd68cb',
        userName: 'Знакомый Тестировича Тестового',
        takesCount: 2,
        lastTakeDuration: '00:03',
        maxPoints: 100,
        avrPoints: 100,
        minPoints: 100,
      },
      {
        userId: '48c5a9d7-5e66-4748-a817-2b41bcf73a00',
        userName: 'Знакомый Админа Админыча',
        takesCount: 1,
        lastTakeDuration: '00:02',
        maxPoints: 100,
        avrPoints: 100,
        minPoints: 100,
      },
    ],
  },
];
