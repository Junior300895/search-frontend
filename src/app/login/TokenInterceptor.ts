import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {KeycloakSecurityService} from '../../services/keycloak-security-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private kcService: KeycloakSecurityService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor...")
    const authToken = this.kcService.getToken() || '';
    request = request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + authToken
      }
    });
    return next.handle(request);
  }
}
