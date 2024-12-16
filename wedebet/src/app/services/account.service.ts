import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../interfaces/house';
import { LoaclstoarageService } from './loaclstoarage.service';
import { APP_CONFIG } from '../app.config';
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
  //user log out
  UserLogout() {
    let user = this.storage.GetData(this.storage.usertoken);
   
    let result = this.httpClient.delete<any>(this.apiUrl + "logout", {
      params: {
        token: user.usertoken
      },
    });

    return result;
  }

  GetAllMyPost(): Observable<House[]> {
    let user = this.storage.GetData(this.storage.usertoken);
    return this.httpClient.get<House[]>(this.apiUrl + 'GetAllMyPosts?token=' + user.usertoken);
  }

  GetKey(): Observable<any> {
   
    return this.httpClient.get<any>(this.apiUrl + 'getKey');
  }
}
