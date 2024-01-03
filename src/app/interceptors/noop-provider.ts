import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './noop-interceptor';
/** Provider for the Noop Interceptor. */
export const noopInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true };