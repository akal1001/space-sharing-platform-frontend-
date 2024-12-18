import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Housetype } from '../interfaces/housetype';

@Injectable({
  providedIn: 'root'
})
export class HouseDataService {

    private apiUrl = APP_CONFIG.apiUrl+"/house/";
    constructor(private httpClient: HttpClient) { }
    
    houseTypes() {
      let result = this.httpClient.get<any>(this.apiUrl + "housetypes");
      return result;
    }

    houses() {
      let result = this.httpClient.get<any>(this.apiUrl + "houses");
      return result;
    }
}
