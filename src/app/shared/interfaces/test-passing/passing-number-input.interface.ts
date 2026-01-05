import { InputSignal } from '@angular/core';
import { NumberAnswer } from './number-answer.interface';

export interface PassingNumberInput {
  passingAnswerInput: InputSignal<NumberAnswer>;
}
