import { PassingUpdateValue } from '@shared/interfaces/test-passing/passing-update-value.interface';
import { TestTaskTypes } from '@eios/tests-common';
import { Nullable } from '@shared/types/nullable.type';
import { PassingAnswers } from '@shared/types/passing-asnwers.type';
import { Uuid } from '@shared/types/uuid.type';

//будет приходить с бэка массив SessionView[]
export interface View {
  id: Uuid;
  testId: Uuid;
  name: Nullable<string>;
  sessionAttemptsLeft: number; //Осталось попыток по сеансу
  maxAttemptsCount: number; //Максимальное количество попыток за сеанс тестирования
  testAttemptsLeft: number; //Осталось попыток по тесту
  testAttemptsLimit: number; //Максимальное количество попыток по всему тесту
  issuerUserName: string;
  testShortName: string;
  disciplineShortNames: string[];
  maxAttemptDuration: number; //Максимальная длительность попытки в минутах
  isStarted: boolean;
  endDate: string;
  endTakeDate: Nullable<string>;
}

export interface PassingRaw {
  testShortName: Nullable<string>;
  name: Nullable<string>;
  taskNumber: number; //номер текущего задания
  taskImage: Nullable<string>;
  isTaskMarked: Nullable<boolean>;
  taskId: Uuid;
  taskText: string;
  type: TestTaskTypes;
  answers: PassingAnswers;
  sessionTasks: number; //общее число заданий
  completedSessionTasks: number; //число завершенных заданий
  endTakeDate: string;
}

export interface PassingView {
  testShortName: Nullable<string>;
  name: Nullable<string>;
  taskNumber: number; //номер текущего задания
  taskImage: Nullable<string>;
  isTaskMarked: Nullable<boolean>;
  taskId: Uuid;
  taskText: string;
  type: TestTaskTypes;
  answers: PassingAnswers;
  sessionTasks: number; //общее число заданий
  completedSessionTasks: number; //число завершенных заданий
  endTakeDate: Date;
}

//тут будет Partial
export interface Update {
  taskId: Uuid;
  taskNumber: number;
  value: PassingUpdateValue[];
}
