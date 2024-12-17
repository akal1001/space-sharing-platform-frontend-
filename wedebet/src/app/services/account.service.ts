import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { House } from '../interfaces/house';
import { LoaclstoarageService } from './loaclstoarage.service';
import { APP_CONFIG } from '../app.config';
import { LoginResponse } from '../interfaces/login-response';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = APP_CONFIG.apiUrl+"/account/";
  constructor(private httpClient: HttpClient, private storage: LoaclstoarageService) { }
  
  UserLoginServe(UsernameOrEmail: any, password: any): Observable<{ loginResponseSuccess:any }> {

    let result = this.httpClient.get<any>(this.apiUrl + "login", {
      params: {
        UsernameOrEmail: UsernameOrEmail,
        password: password
      },
    });

    return result;
  }
  //create new user
  postNewUserService(username: any,password: any,email: any): Observable<{ success: string; message:string }> {
    const endpont =this.apiUrl +"signup?username=" +username +"&password=" +password +"&email=" +email;
    return this.httpClient.post<any>(endpont, "");
  }

  retrieveAccountDataFromLocalStorage(): Observable<LoginResponse | null> {
    const storedData = localStorage.getItem('v');
    if (storedData) {
      const parsedData: LoginResponse = JSON.parse(storedData);
      return of(parsedData);  
    } else {
      return of(null);
    }
  }





  //user log out
  UserLogout() {
   
   
    let result = this.httpClient.delete<any>(this.apiUrl + "logout", {
      params: {
        
      },
    });

    return result;
  }

  GetAllMyPost(): Observable<House[]> {
    
    return this.httpClient.get<House[]>(this.apiUrl + 'GetAllMyPosts?token=');
  }

  GetKey(): Observable<any> {
   
    return this.httpClient.get<any>(this.apiUrl + 'getKey');
  }
}
