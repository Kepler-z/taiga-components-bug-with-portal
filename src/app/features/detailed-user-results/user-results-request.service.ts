import { Injectable } from '@angular/core';
import { TakeIds } from '@shared/interfaces/commons/ids/ids.interface';
import { Observable, of } from 'rxjs';
import { mockAttemptsByTakeId, mockDefaultAttempt } from './mock/mock-attempts-by-takeid';
import { UserTestDetails } from './user-test-details.interface';

@Injectable()
export class UserResultsRequestService {
  getUserTestDetails(takeIds: TakeIds): Observable<UserTestDetails> {
    return of(mockAttemptsByTakeId.get(takeIds.takeId) ?? mockDefaultAttempt);
  }
}
