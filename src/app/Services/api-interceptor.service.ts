import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tokenGetter } from "../app.module";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var key = tokenGetter();

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${key}`
      }
    });

    return next.handle(request);
  }
}