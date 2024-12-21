import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Housetype } from '../interfaces/housetype';
import { House } from '../interfaces/house';

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
      let result = this.httpClient.get<House>(this.apiUrl + "houses");
      return result;
    }

    AvailablehouseTypes() {
      let result = this.httpClient.get<any>(this.apiUrl + "AvailablePostedHousetypes");
      return result;
    }

    houseDetail( houseId:string){
      let result = this.httpClient.get<any>(this.apiUrl + "houseDetail?houseId="+houseId);
      return result;
    }

    InserHouseTypes(htype:string) {
      let result = this.httpClient.post(this.apiUrl + "InsertHouseType?housetype="+htype, "");
      return result;
    }
}
