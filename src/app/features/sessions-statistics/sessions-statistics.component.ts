import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Results } from '@shared/models';
import { Uuid } from '@shared/types/uuid.type';
import { TuiResponsiveDialogService } from '@taiga-ui/addon-mobile';
import { TuiButton, TuiDropdown } from '@taiga-ui/core';
import { DetailedUserResultsComponent } from '../detailed-user-results/detailed-user-results.component';
import { POPOUT_DATA, PopoutData } from '../popout/popout-data.token';
import { PopoutService } from '../popout/popout.service';
import { mockUsersListData } from './mock/mock-user-list-data';
import { userStatisticsForWholeTest } from './mock/mock-user-statistics-for-whole-test';

@Component({
  selector: 'app-sessions-statistics',
  imports: [TuiButton, TuiDropdown],
  templateUrl: './sessions-statistics.component.html',
  styleUrl: './sessions-statistics.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsStatisticsComponent implements OnDestroy {
  private router = inject(Router);
  private dialogs = inject(TuiResponsiveDialogService);
  private popoutService = inject(PopoutService);

  private testId: Uuid = '65c31d73-a98c-459c-8308-98fc4fd98f35';

  goToDefaultPage() {
    this.router.navigate(['']);
  }

  // данные списка (не в модалке, а сразу при открытой странице)
  mockUsersListData: Results.Division[] = mockUsersListData;

  //данные для модалки
  getUserTestStatistics(userId: Uuid): Results.TestSessionsView[] {
    return userStatisticsForWholeTest.get(userId) ?? [];
  }

  protected showUserTestStatisticsModal(
    userTestStatisticsTpl: TemplateRef<unknown>,
    data: Results.TestSessionsView[],
    userName: string
  ): void {
    this.currentUserName.set(userName);
    this.currentUserTestStatisticsData.set(data);
    this.dialogs.open(userTestStatisticsTpl, { label: 'Статистика пользователя по тесту', size: 'auto' }).subscribe();
  }

  currentUserName = signal<string>('');
  currentUserTestStatisticsData = signal<Results.TestSessionsView[]>([]);

  openUserDetailsTab(sessionName: string | undefined, sessionId: Uuid, takeId: Uuid) {
    const userName = this.currentUserName();

    if (sessionId && takeId) {
      const data: PopoutData = {
        testId: this.testId,
        sessionId,
        takeId,
        userName,
        sessionName,
      };

      this.popoutService.openInNewTab(DetailedUserResultsComponent, data, POPOUT_DATA);
    }
  }

  ngOnDestroy(): void {
    // Закрываем popout вкладку при уходе со страницы
    this.popoutService.closePopout();
  }
}
