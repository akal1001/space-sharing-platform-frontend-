import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_key_Config } from '../app.config';

@Injectable({
  providedIn: 'root', // Ensures it's available globally
})
export class ApiKeyInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apikeyValue = API_key_Config.value;
    const apikeyName = API_key_Config.keyName;

    const clonedRequest = req.clone({
      setHeaders: {
        [apikeyName]: apikeyValue, 
      },
    });

    return next.handle(clonedRequest);
  }
}
