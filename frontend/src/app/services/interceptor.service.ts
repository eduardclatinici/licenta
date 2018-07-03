import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = LocalStorageService.getAuthorizationToken();
    if (!req.url.includes('/api/tasks/')) {
      if (authToken != undefined)
        return next.handle(req.clone({headers: req.headers.set('Authorization', authToken).set('Content-Type', 'application/json')}));
      else
        return next.handle(req.clone({headers: req.headers.set('Content-Type', 'application/json')}));
    }
    else{
      return next.handle(req.clone({headers: req.headers.set('Authorization', authToken)}))
    }
  }
}
