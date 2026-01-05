import { TuiRoot } from '@taiga-ui/core';
import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TUI_EDITOR_DEFAULT_EXTENSIONS, TUI_EDITOR_EXTENSIONS } from '@taiga-ui/editor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      deps: [Injector],
      useFactory: (injector: Injector) => [
        ...TUI_EDITOR_DEFAULT_EXTENSIONS,
        import('@taiga-ui/editor').then(({ setup }) => setup({ injector })),
      ],
    },
  ],
})
export class AppComponent {}
