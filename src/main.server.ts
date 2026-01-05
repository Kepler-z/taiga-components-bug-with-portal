import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
/* (globalThis as any).requestAnimationFrame = (...args: any[]) => {
  console.error('requestAnimationFrame was called on the server!');
  console.trace(); // покажет стек
  return setTimeout(() => args[0](), 16); // фоллбэк, чтобы не падало
}; */
