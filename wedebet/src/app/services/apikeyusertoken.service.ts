import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { API_key_Config } from '../app.config';
@Injectable({
  providedIn: 'root'
})
export class ApikeyusertokenService {

  constructor() {}

  // Private method to get the API key headers from the config
  private getApiKeyHeaders(): HttpHeaders {
    return new HttpHeaders().set(API_key_Config.keyName, API_key_Config.value);
  }

  // Private method to retrieve user token from local storage
  private getUserToken(): Observable<LoginResponse> {
    const storedData = localStorage.getItem('v');
    if (storedData) {
      const parsedData: LoginResponse = JSON.parse(storedData);
      return of(parsedData);
    } else {
      const nullData: LoginResponse = {
        success: false,
        message: '',
        name: '',
        id: '',
        token: '',
      };
      return of(nullData);
    }
  }

  // Method to create headers based on whether a token is needed
  public createHeaders(needsToken: boolean = false): Observable<HttpHeaders> {
    const apiKeyHeaders = this.getApiKeyHeaders(); // API key headers
    if (!needsToken) {
      // If the token is not needed, return only the API key headers
      return of(apiKeyHeaders);
    }

    // If the token is needed, combine it with the API key
    return this.getUserToken().pipe(
      map((user) => {
        const token = user.token;
        if (token) {
          return apiKeyHeaders.set('Authorization', token);
        }
        return apiKeyHeaders; // Fallback to API key only
      }),
      catchError(() => of(apiKeyHeaders))
    );
  }
}
