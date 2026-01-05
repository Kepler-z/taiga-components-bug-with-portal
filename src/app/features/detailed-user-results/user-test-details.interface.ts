import { Nullable } from '@shared/types/nullable.type';

export interface UserTestDetails {
  points100: number;
  points5: number;
  duration: string;
  rightAnswers: number;
  tasksCount: number;
  tasksResults: TaskResult[];
}

export interface TaskResult {
  taskNumber: number;
  potentialPoints: number;
  earnedPoints: number;
  taskText: string;
  taskImage: Nullable<string>;
  taskType: 'singleChoice';
  answers: Answer[];
  isWasRight: boolean;
  rightAnswers: Nullable<Answer[]>;
  additionalInfo: Nullable<string>;
}

export interface Answer {
  text: string;
  image: Nullable<string>;
}
