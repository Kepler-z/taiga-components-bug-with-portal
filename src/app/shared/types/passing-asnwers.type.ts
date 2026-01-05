import { CommonAnswer } from '@shared/interfaces/test-passing/common-answer.interface';
import { NumberAnswer } from '@shared/interfaces/test-passing/number-answer.interface';

export type PassingAnswers = CommonAnswer[] | NumberAnswer[];
