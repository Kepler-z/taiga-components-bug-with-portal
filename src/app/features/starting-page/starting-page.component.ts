import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-starting-page',
  imports: [TuiButton],
  templateUrl: './starting-page.component.html',
  styleUrl: './starting-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartingPageComponent {
  private router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  goToSessionsStatistics() {
    this.router.navigate(['sessions-statistics'], {
      relativeTo: this.activatedRoute,
    });
  }
}
