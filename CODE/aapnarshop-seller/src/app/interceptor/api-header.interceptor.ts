import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/Auth/auth.service';
import { ConfigService } from '../service/config/config.service';

@Injectable()
export class ApiHeaderInterceptor implements HttpInterceptor {

  userId: string;

  constructor(private authService: AuthService, private configservice: ConfigService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authService.currentUserId();
    /* if (currentUser) {
      this.userId = this.authService.currentUserId();
    } else {
      this.userId = "8800000000000";
    } */

    const modified = request.clone({
      setHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Basic " + btoa(this.configservice.getServerUsername() + ":" + this.configservice.getServerPassword()),
        "Content-Type": "application/json;charset=UTF-8",
        "UserId": currentUser,
        "Token": "fake-fcm-token-from-sellerweb-angular",
        "Language": "EN"
      }
    });
    return next.handle(modified);
  }
}