import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
 private apiUrl = APP_CONFIG.apiUrl+"/version/";
  constructor(private httpClient: HttpClient) { }
  
  GetVersionServe(): Observable<{success:boolean,status:string,data:string,message:string}> {
      let result = this.httpClient.get<any>(this.apiUrl + "version");
      return result;
    }
}
