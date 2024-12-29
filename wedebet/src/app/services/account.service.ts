import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { House } from '../interfaces/house';

import { APP_CONFIG } from '../app.config';
import { LoginResponse } from '../interfaces/login-response';
import { HouseDataRequest } from '../interfaces/house-data-request';
import { HouseDetail } from '../interfaces/house-detail';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = APP_CONFIG.apiUrl+"/account/";

  constructor(private httpClient: HttpClient) { }
  
  // UserLoginServe1(UsernameOrEmail: any, password: any): Observable<{ loginResponseSuccess:any }> {

  //   let result = this.httpClient.get<any>(this.apiUrl + "login", {
  //     params: {
  //       UsernameOrEmail: UsernameOrEmail,
  //       password: password
  //     },
  //   });

  //   return result;
  // }
  UserLoginServe(UsernameOrEmail: any, password: any): Observable<{ loginResponseSuccess: any }> {
    const loginData = {
      UsernameOrEmail: UsernameOrEmail,
      Password: password
    };
  
    // Sending login data in the request body with POST
    let result = this.httpClient.post<any>(this.apiUrl + "login", loginData);
  
    return result;
  }
  //create new user
  postNewUserService(username: any,password: any,email: any): Observable<{ success: boolean; message:string }>
   {
     const signupRequestData={
       username:username,
       password:password,
       email:email
     }
    return this.httpClient.post<any>(this.apiUrl +"signup", signupRequestData);
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






  GetAllMyPost(token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.get<any>(`${this.apiUrl}MyPosts`, { headers });
  }
  DeleteMyPost(houseId:any, token:any):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.delete<any>(`${this.apiUrl}deletePost?houseId=`+ houseId, { headers });
  }



 
}
