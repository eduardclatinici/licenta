import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

// @Injectable()
// export class SharedData {
//   jwt() {
//     const currentUserToken = localStorage.getItem('currentUserToken');
//     if (currentUserToken) {
//       const headers = new HttpHeaders({ 'Authorization':  currentUserToken ,
//         'Content-type': 'application/json'});
//       return new RequestOptions({ headers: headers });
//     }
//   }
// }

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authToken = this.auth.getAuthorizationToken();
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('Authorization', authToken)});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
