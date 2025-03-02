import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './core/interceptor/token.interceptor';
import { errorsInterceptor } from './core/interceptor/errors.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withDebugTracing() ,withViewTransitions()),
    provideAnimations(),
    provideHttpClient(withInterceptors([tokenInterceptor, errorsInterceptor])), provideAnimationsAsync()
  ]
};
