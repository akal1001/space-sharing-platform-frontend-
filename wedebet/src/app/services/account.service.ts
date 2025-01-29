import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { House } from '../interfaces/house';

import { APP_CONFIG } from '../app.config';
import { LoginResponse } from '../interfaces/login-response';
import { HouseDataRequest } from '../interfaces/house-data-request';
import { HouseDetail } from '../interfaces/house-detail';
import { ApikeyusertokenService } from './apikeyusertoken.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = APP_CONFIG.apiUrl+"/account/";

  constructor(private httpClient: HttpClient, private apikeyusertokenService:ApikeyusertokenService) { }
  
  
  UserLoginServe(UsernameOrEmail: string, password: string): Observable<any> {
    const loginRequest = {
      UsernameOrEmail: UsernameOrEmail,
      Password: password
    };

    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        return this.httpClient.post<any>(`${this.apiUrl}login`, loginRequest, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }
  //create new user
  postNewUserService(username: any,password: any,email: any): Observable<{ success: boolean; message:string }>
   {
     const signupRequestData={
       username:username,
       password:password,
       email:email
     }
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        return this.httpClient.post<any>(this.apiUrl +"create", signupRequestData,{headers});
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }
  
  ReturnUserDataFromLocalStorage(): Observable<LoginResponse | null> {
    const storedData = localStorage.getItem('v');
    if (storedData) {
      const parsedData: LoginResponse = JSON.parse(storedData);
      return of(parsedData);  
    } else {
      const nullData:LoginResponse = {
        success:false,
        message: '',
        name: '',
        id: '',
        token: ''
      };
      return of(nullData);
    }
  }

  ChangeUserLocation(ip: any) {
    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.post<any>(`${this.apiUrl}ChangeLocation?ip=${ip}`, {}, { headers });
      }),
      catchError((error) => {
        console.error('Error changing location:', error);
        return throwError(() => error);
      })
    );
  }

  
  
}
