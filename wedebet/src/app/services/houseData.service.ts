import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, map, Observable, switchMap, throwError } from 'rxjs';
import { Housetype } from '../interfaces/housetype';
import { House } from '../interfaces/house';
import { HouseDetail } from '../interfaces/house-detail';
import { Image } from '../interfaces/image';
import { AccountService } from './account.service';
import { HouseDataRequest } from '../interfaces/house-data-request';

@Injectable({
  providedIn: 'root'
})
export class HouseDataService {

  private apiUrl = APP_CONFIG.apiUrl + "/house/";
  constructor(private httpClient: HttpClient, private accountDataService: AccountService) {

  }
  uploadHouse(uploadHouseRequest: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.post(this.apiUrl + "_ph", uploadHouseRequest, { headers });
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

  houseDetail(houseId: string) {
    let result = this.httpClient.get<any>(this.apiUrl + "_ghd_b_id?houseId=" + houseId);
    return result;
  }

  InserHouseTypes(htype: string) {
    let result = this.httpClient.post(this.apiUrl + "_pht?housetype=" + htype, "");
    return result;
  }


  getHouses(pageNumber: number, pageSize: number): Observable<any> {
    const url = `${this.apiUrl}_gh_b_page?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.httpClient.get<any>(url);
  }

  getHousesByHouseTypeId(pageNumber: number, pageSize: number, housetypeId: string): Observable<any> {
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

  AddImages(images: any[]): Observable<any> {
    return this.accountDataService.ReturnUserDataFromLocalStorage().pipe(
      map((response) => response?.token),
      switchMap((token) => {
        if (!token) {
          console.error('Token is null or undefined');
          throw new Error('Token is null or undefined');
        }

        const headers = new HttpHeaders().set('Authorization', token);

        // Log images being sent
        console.log('Sending images:', images);

        return this.httpClient.post(`${this.apiUrl}PostImage`, images, { headers });
      })
    );
  }


  updateHouse(uploadHouseRequest: HouseDataRequest): Observable<any> {

    
    return this.accountDataService.ReturnUserDataFromLocalStorage().pipe(
      map((response) => response?.token),
      switchMap((token) => {
        if (!token) {
          console.error('Token is null or undefined');
          throw new Error('Token is null or undefined');
        }

        const headers = new HttpHeaders().set('Authorization', token);
        
        console.log("update data : " + JSON.stringify(uploadHouseRequest))


        return this.httpClient.post<any>(`${this.apiUrl}UpdateHouse`, uploadHouseRequest, { headers })
          .pipe(
            catchError((error) => {
              console.error('Error updating house:', error);
              throw error;
            })
          );
      })
    )
  }
}







