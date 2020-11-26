import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHeaderInterceptor } from './api-header.interceptor';
import { ApiLoaderInterceptor } from './api-loader.interceptor';

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiLoaderInterceptor, multi: true }
];
