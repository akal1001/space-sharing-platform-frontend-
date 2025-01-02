import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Housetype } from '../interfaces/housetype';
import { House } from '../interfaces/house';
import { HouseDetail } from '../interfaces/house-detail';

@Injectable({
  providedIn: 'root'
})
export class HouseDataService {

    private apiUrl = APP_CONFIG.apiUrl+"/house/";
    constructor(private httpClient: HttpClient) { 

    }
    uploadHouse(uploadHouseRequest: any, token: string): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.apiUrl+"_ph", uploadHouseRequest, { headers });
    }
    
    houseTypes() {
      let result = this.httpClient.get<any>(this.apiUrl + "_ght");
      return result;
    }

    houses() {
      let result = this.httpClient.get<House>(this.apiUrl + "_gh_s");
      return result;
    }



    AvailablehouseTypes() {
      let result = this.httpClient.get<any>(this.apiUrl + "_gapht");
      return result;
    }

    houseDetail( houseId:string){
      let result = this.httpClient.get<any>(this.apiUrl + "_ghd_b_id?houseId="+houseId);
      return result;
    }

    InserHouseTypes(htype:string) {
      let result = this.httpClient.post(this.apiUrl + "_pht?housetype="+htype, "");
      return result;
    }
  

    getHouses(pageNumber: number, pageSize: number): Observable<any> {
      const url = `${this.apiUrl}_gh_b_page?pageNumber=${pageNumber}&pageSize=${pageSize}`;
      return this.httpClient.get<any>(url);
    }

    getHousesByHouseTypeId(pageNumber: number, pageSize: number, housetypeId:string): Observable<any> {
      const url = `${this.apiUrl}_gh_b_hti_page?pageNumber=${pageNumber}&pageSize=${pageSize}&houseTypeId=${housetypeId}`;
      return this.httpClient.get<any>(url);
    }
    
    getNewPostHouseCount(lastFetchedDate: any): Observable<any> {
     
      const url = `${this.apiUrl}_gnphc?lastFetchedDate=${lastFetchedDate}`;
      return this.httpClient.get<any>(url);
    }
    AddUserSelectionPost(houseId: any, token: any): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', token);
      return this.httpClient.post(
        `${this.apiUrl}pus?houseId=${houseId}`,
        {}, // Empty body
        { headers } // Pass headers correctly here
      );
    }
    
}
