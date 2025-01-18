import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, from, map, Observable, switchMap, throwError } from 'rxjs';
import { Housetype } from '../interfaces/housetype';
import { House } from '../interfaces/house';
import { HouseDetail } from '../interfaces/house-detail';
import { Image } from '../interfaces/image';
import { AccountService } from './account.service';
import { HouseDataRequest } from '../interfaces/house-data-request';
import { ApikeyusertokenService } from './apikeyusertoken.service';
import { IndexeddbService } from './indexeddb.service';


@Injectable({
  providedIn: 'root'
})
export class HouseDataService {

  private apiUrl = APP_CONFIG.apiUrl + "/house/";

  constructor(private httpClient: HttpClient, private indexeddbService:IndexeddbService,  private apikeyusertokenService: ApikeyusertokenService) {

  }
  uploadHouse(uploadHouseRequest: any): Observable<any> {
   
    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.post(this.apiUrl + "_ph", uploadHouseRequest, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching available house types:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );
  }

  houseTypes():Observable<any> {
    
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
      
        return this.httpClient.get<any>(this.apiUrl + "_ght",{headers})
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );

  }

  // houses() {

  //   let result = this.httpClient.get<House>(this.apiUrl + "_gh_s");
  //   return result;
  // }


  AvailablehouseTypes(): Observable<any> {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}_gapht`;
        return this.httpClient.get<any>(url, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching available house types:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );
  }
  

  houseDetail(houseId: string) {

    let result = this.httpClient.get<any>(this.apiUrl + "_ghd_b_id?houseId=" + houseId);
    return result;
  }

  InserHouseTypes1(htype: string) {

    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
      
        return this.httpClient.post(this.apiUrl + "_pht?housetype=" + htype, {headers})
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );

  }

  InserHouseTypes(htype: string) {
    return this.httpClient.post('/api/proxy/house-types', { housetype: htype }).pipe(
      catchError((error) => {
        console.error('Error forwarding request:', error);
        return throwError(() => error);
      })
    );
  }


  getHouses(pageNumber: number, pageSize: number): Observable<any> {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}getHoussePage?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.httpClient.get<any>(url, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );
  }
  getHousesByLocation(pageNumber: number, pageSize: number): Observable<any> {
    return from(this.indexeddbService.getData('api/location')).pipe(
      switchMap((data) => {
        if (data) {
          const storedLocation = data.data; // Assuming `data` has a `data` property
          console.log(`Using cached location: ${storedLocation.country}`);
          return this.fetchHouses(storedLocation, pageNumber, pageSize);
        } else {
          console.warn('No data found in IndexedDB cache.');
          return throwError(() => new Error('Location data not found in cache.'));
        }
      }),
      catchError((error) => {
        console.error('Error retrieving location data:', error);
        return throwError(() => error);
      })
    );
  }
  
  private fetchHouses(location: Location, pageNumber: number, pageSize: number): Observable<any> {

    const url = `${this.apiUrl}getHoussByLocationPage?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        return this.httpClient.post<any>(url, location, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }
  



  getHousesByHouseTypeId(pageNumber: number, pageSize: number, housetypeId: string): Observable<any> {

    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}_gh_b_hti_page?pageNumber=${pageNumber}&pageSize=${pageSize}&houseTypeId=${housetypeId}`;
        return this.httpClient.get<any>(url, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );
  }

  getNewPostHouseCount(lastFetchedDate: any): Observable<any> {

    const url = `${this.apiUrl}_gnphc?lastFetchedDate=${lastFetchedDate}`;
    return this.httpClient.get<any>(url);
  }


  // AddUserSelectionPost(houseId: any, token: any): Observable<any> {

  //   const headers = new HttpHeaders().set('Authorization', token);
  //   return this.httpClient.post(
  //     `${this.apiUrl}pus?houseId=${houseId}`,
  //     {}, // Empty body
  //     { headers } // Pass headers correctly here
  //   );
  // }

  AddUserSelectionPost(houseId: any): Observable<any> {

    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.post(
          `${this.apiUrl}pus?houseId=${houseId}`,{}, { headers } 
        );
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); 
      })
    );
    
  }

  AddImages(images: any[]): Observable<any> {

    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.post(`${this.apiUrl}PostImage`, images, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); 
      })
    );
  }


  updateHouse(uploadHouseRequest: HouseDataRequest): Observable<any> {

    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.post<any>(`${this.apiUrl}UpdateHouse`, uploadHouseRequest, { headers })
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); 
      })
    );
  }

  DeleteFavoriteHouse(houseId: any): Observable<any> {
  
    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}DeleteFavorite?houseId=${houseId}`;
        console.log('Request URL:', url);
        console.log('Request Headers:', headers);
  
        return this.httpClient.delete<any>(url, { headers });
      }),
      catchError((error) => {
        console.error('Error deleting favorite house:', error);
        return throwError(() => error);
      })
    );
  }

  GetUserPost(pageNumber: number, pageSize: number): Observable<any> {
    
    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        //return this.httpClient.get<any>(`${this.apiUrl}GetHouse`, { headers });
        const url = `${this.apiUrl}GetHouse?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.httpClient.get<any>(url, { headers });
  
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }
  
  
  DeleteMyPost(houseId:any):Observable<any>{

    return this.apikeyusertokenService.createHeaders(true).pipe(
    switchMap((headers) => {
      return this.httpClient.delete<any>(`${this.apiUrl}DeleteHouse?houseId=`+ houseId, { headers });
    }),
    catchError((error) => {
      console.error('Error fetching houses:', error);
      return throwError(() => error);
    })
  );
}

  GetAllMySelectionPost(pageNumber: number, pageSize: number): Observable<any> {

    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}_gs?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return this.httpClient.get<any>(url, { headers });
    
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }

  GetTop3HousePost():Observable<any>{

    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}top3?`;
        return this.httpClient.get<any>(url, { headers });
    
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }


  GetTop3HousePostByLocation():Observable<any>{

    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}location?`;
        return this.httpClient.get<any>(url, { headers });
    
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }

}


// this.apikeyusertokenService.createHeaders(false).subscribe({next:()=>{},error(err) {
       
// },})




