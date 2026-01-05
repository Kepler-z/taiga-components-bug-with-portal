import { Results } from '@shared/models';

export const firstUserData: Results.TestSessionsView[] = [
  {
    sessionId: '8616fc94-b234-443f-a94b-8de54a8a14da',
    sessionName: 'тестируем историю сеансов:для тестировича',
    takesResults: [
      {
        id: '41245d05-be61-4c72-badc-5131c3b5d2e5',
        startDate: new Date('2025-09-09T20:03:49.094Z'),
        points100: 100,
        points5: 5,
        duration: '00:03',
        rightAnswers: 1,
        tasksCount: 1,
        sessionName: 'для тестировича',
        testShortName: 'тестируем историю сеансов',
        sessionId: '8616fc94-b234-443f-a94b-8de54a8a14da',
      },
    ],
  },
  {
    sessionId: '7a343fbf-4cb8-43d6-8fb7-fdd3f09d10a3',
    sessionName: 'тестируем историю сеансов:тест нескольких 2.0',
    takesResults: [
      {
        id: 'aa45bcd7-096a-4e59-bd2e-eb6e81621910',
        startDate: new Date('2025-08-28T12:17:57.149Z'),
        points100: 0,
        points5: 2,
        duration: '00:03',
        rightAnswers: 0,
        tasksCount: 1,
        sessionName: 'тест нескольких 2.0',
        testShortName: 'тестируем историю сеансов',
        sessionId: '7a343fbf-4cb8-43d6-8fb7-fdd3f09d10a3',
      },
    ],
  },
];
export const secondUserData: Results.TestSessionsView[] = [
  {
    sessionId: '7a343fbf-4cb8-43d6-8fb7-fdd3f09d10a3',
    sessionName: 'тестируем историю сеансов:тест нескольких 2.0',
    takesResults: [
      {
        id: 'e52fca1c-1ab4-4447-9854-02ba59a68053',
        startDate: new Date('2025-08-28T12:26:04.075Z'),
        points100: 100,
        points5: 5,
        duration: '00:03',
        rightAnswers: 1,
        tasksCount: 1,
        sessionName: 'тест нескольких 2.0',
        testShortName: 'тестируем историю сеансов',
        sessionId: '7a343fbf-4cb8-43d6-8fb7-fdd3f09d10a3',
      },
      {
        id: '82b8f7b3-8fe4-4d54-8502-438a1d7257db',
        startDate: new Date('2025-08-28T12:16:42.863Z'),
        points100: 100,
        points5: 5,
        duration: '00:02',
        rightAnswers: 1,
        tasksCount: 1,
        sessionName: 'тест нескольких 2.0',
        testShortName: 'тестируем историю сеансов',
        sessionId: '7a343fbf-4cb8-43d6-8fb7-fdd3f09d10a3',
      },
    ],
  },
  {
    sessionId: '24beb787-6b1b-4b8e-9bcc-44454c9edbeb',
    sessionName: 'тестируем историю сеансов:ТИС',
    takesResults: [
      {
        id: '8a658ae8-4286-45f2-8453-0531c4a94950',
        startDate: new Date('2025-08-28T12:07:05.388Z'),
        points100: 100,
        points5: 5,
        duration: '00:03',
        rightAnswers: 1,
        tasksCount: 1,
        sessionName: 'ТИС',
        testShortName: 'тестируем историю сеансов',
        sessionId: '24beb787-6b1b-4b8e-9bcc-44454c9edbeb',
      },
    ],
  },
];
export const thirdUserData: Results.TestSessionsView[] = [];
