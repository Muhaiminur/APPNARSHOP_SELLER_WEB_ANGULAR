import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, tap, finalize } from 'rxjs/operators';
import { LoaderService } from '../service/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  progress: number = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    return next.handle(request).pipe(
      delay(1000),
      tap(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response) {
            this.loaderService.hide();
          }
        },
        (err: any) => {
          this.loaderService.hide();
        }
      )
    );
  }
}
