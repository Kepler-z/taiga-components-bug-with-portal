import { Nullable } from '@shared/types/nullable.type';
import { Uuid } from '@shared/types/uuid.type';

/* кто НАЗНАЧИЛ ТЕСТ */
export interface InitiatorView {
  id: Uuid; //id теста
  shortName: string;
  fullName: string;
  takesCount: number; //Кол-во выполненных попыток по тесту
  sessionsCount: number; //Кол-во сеансов тестирования по тесту
  successfulTakesCount: number; //Кол-во успешных попыток по тесту
  averageTakePoints: number; //Средний балл выполненных попыток
  takePointsRMS: number; //СКО баллов выполненных попыток
}

//будет массив приходить для таблицы
export interface InitiatorSessionRaw {
  id: Uuid; //id сеанса
  name: string; //Краткое наименование сеанса тестирование
  startDate: string;
  endDate: string;
  usersAbleToTakeCount: number; //Кол-во пользователей, допущеных к выполнению теста
  usersWithTakesCount: number; //Кол-во пользователей, выполнявших тест
  usersWithSuccessfulTakesCount: number; //Кол-во пользователей, выполнивших тест успешно
  divisionNamesAbleToTake: Nullable<DivisionNameAbleToTake[]>; //Подразделения, допущенные к выполнению теста
}

export interface InitiatorSessionView extends Omit<InitiatorSessionRaw, 'startDate' | 'endDate'> {
  startDate: Date;
  endDate: Date;
}

//Результаты по сеансу
export interface Division {
  id: Uuid;
  shortName: string; //название подразделения
  fullName: string; //полное название подразделения
  usersResults: User[];
}

export interface User {
  userId: Uuid;
  userName: string;
  takesCount: number;
  lastTakeDuration: string;
  maxPoints: number;
  avrPoints: number;
  minPoints: number;
}

//Статистика по сеансу по классам и людям -> результаты во всех сеансах по данному тесту у данного студента
export interface TestSessionsRaw {
  sessionName: string;
  sessionId: Uuid;
  takesResults: ExecutorTrialRaw[];
}
export interface TestSessionsView extends Omit<TestSessionsRaw, 'takesResults'> {
  takesResults: ExecutorTrialView[];
}

/* ПРОХОДЯЩИЙ */
export interface ShortView extends ExecutorBaseResult {
  rightAnswers: number;
  tasksCount: number;
}

//Будет массив тестов, которые были пройдены
export interface ExecutorTestView {
  id: Uuid;
  shortName: string;
  fullName: string;
  takesCount: number;
}

export interface ExecutorTrialRaw extends ExecutorBaseResult {
  startDate: string;
}
export interface ExecutorTrialView extends ExecutorBaseResult {
  startDate: Date;
}

interface ExecutorBaseResult {
  id: Uuid;
  sessionId: Uuid;
  sessionName: string;
  testShortName: string;
  points100: number;
  points5: number;
  duration: string;
  rightAnswers: number;
  tasksCount: number;
}
interface DivisionNameAbleToTake {
  shortName: string;
  fullName: string;
}
