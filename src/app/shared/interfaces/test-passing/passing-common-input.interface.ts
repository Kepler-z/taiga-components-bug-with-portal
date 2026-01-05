import { InputSignal } from '@angular/core';
import { CommonAnswer } from './common-answer.interface';

export interface PassingCommonInput {
  passingAnswerInput: InputSignal<CommonAnswer>;
}
