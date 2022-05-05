import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaclstoarageService } from './loaclstoarage.service';
import { House } from '../interfaces/house';

//import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs/dist/types/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _baseUploadUrl = environment.baseurl + "account/"
  constructor(private httpClient: HttpClient, private storage: LoaclstoarageService) { }
  //login user
  UserLoginServe(UsernameOrEmail: any, password: any): Observable<any> {

    // alert(UsernameOrEmail + "  " + password)
    let result = this.httpClient.get<any>(this._baseUploadUrl + "login", {
      params: {
        UsernameOrEmail: UsernameOrEmail,
        password: password
      },
    });

    return result;
  }
  //create new user
  postNewUserService(
    username: any,
    password: any,
    email: any
  ): Observable<boolean> {
    // string username, string password, string email
    const endpont =
      this._baseUploadUrl +
      "signup?username=" +
      username +
      "&password=" +
      password +
      "&email=" +
      email;
    return this.httpClient.post<boolean>(endpont, "");
  }
  //user log out
  UserLogout() {
    let user = this.storage.GetData(this.storage.usertoken);
   
    let result = this.httpClient.delete<any>(this._baseUploadUrl + "logout", {
      params: {
        token: user.usertoken
      },
    });

    return result;
  }

  GetAllMyPost(): Observable<House[]> {
    let user = this.storage.GetData(this.storage.usertoken);
    return this.httpClient.get<House[]>(this._baseUploadUrl + 'GetAllMyPosts?token=' + user.usertoken);
  }

  GetKey(): Observable<any> {
   
    return this.httpClient.get<any>(this._baseUploadUrl + 'getKey');
  }
}
