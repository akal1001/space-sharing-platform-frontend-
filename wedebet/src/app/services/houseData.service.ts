import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { catchError, from, Observable, of, switchMap, tap, throwError } from 'rxjs';
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

  
  fetchLocationWithMaxId() {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        return this.httpClient.get<any>(`${this.apiUrl}locationWithMaxId`, { headers });
      }),
      catchError((error) => {
        console.error('Error changing location:', error);
        return throwError(() => error);
      })
    );
  }

  fetchHouseDataByLocation(loadRequest: { maxId: string; location: string }): Observable<any> {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) =>
        this.httpClient.post<any>(
          `${this.apiUrl}loadData`,
          loadRequest, // Directly pass loadRequest as the body
          { headers }
        )
      ),
      catchError((error) => {
        console.error('Error loading data:', error);
        return throwError(() => error);
      })
    );
  }




  GetDataByLocationWithMaxId(maxId: any, location: any) {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        return this.httpClient.post<any>(
          `${this.apiUrl}loadData?maxid=${maxId}`,
          {location}, // Pass location in the body
          { headers }
        );
      }),
      catchError((error) => {
        console.error('Error loading data:', error);
        return throwError(() => error);
      })
    );
  }
  //last inserted id
  GetHouseMaxId() {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        return this.httpClient.get<any>(
          `${this.apiUrl}GetMaxHouseId`,
          { headers }
        );
      }),
      catchError((error) => {
        console.error('Error loading data:', error);
        return throwError(() => error);
      })
    );
  }



  uploadHouse(uploadHouseRequest: any): Observable<any> {
   
    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.post(this.apiUrl + "postHouse", uploadHouseRequest, { headers });
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
  

  houseDetail1(houseId: any) {

    let result = this.httpClient.get<any>(this.apiUrl + "_ghd_b_id?houseId=" + houseId);
    return result;
  }

  houseDetail(houseId: any): Observable<any> {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}GetHouseById?houseId=${houseId}`;
        return this.httpClient.get<any>(url, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );
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
   
    return from(this.indexeddbService.getDecriptedData('location')).pipe(
      switchMap((data) => {
        if (data) {
        
          const storedLocation = data; // Assuming `data` has a `data` property
         
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
  
  private fetchHouses(location: any, pageNumber: number, pageSize: number): Observable<any> {
    
    const url = `${this.apiUrl}getHoussByLocationPage?lastId=${pageNumber}&pageSize=${pageSize}`;
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

  // return this.httpClient.post(this.apiUrl+'house-types', { housetype: htype }).pipe(
  //   catchError((error) => {
  //     console.error('Error forwarding request:', error);
  //     return throwError(() => error);
  //   })
  // );
  InserHouseTypes(htype: string) {
    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.post(this.apiUrl + 'AddHouseType', { housetype: htype }, { headers }).pipe(
          catchError((error) => {
            console.error('Error forwarding request:', error);
            return throwError(() => error);
          })
        );
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
        const url = `${this.apiUrl}GetUsersSavedData?pageNumber=${pageNumber}&pageSize=${pageSize}`;
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


  GetTop3HousePostByLocation(): Observable<{ success: boolean; message: string; data: any[]; location: any | null }> {
    const userInf = localStorage.getItem('v');
    const isUserLoggedIn = userInf !== null;

   
  
    const url = isUserLoggedIn 
      ? `${this.apiUrl}location2` 
      : `${this.apiUrl}location`;
  
    return this.apikeyusertokenService.createHeaders(isUserLoggedIn).pipe(
      switchMap((headers) => {
        const request = isUserLoggedIn
          ? this.httpClient.post<any>(url, {}, { headers })
          : this.httpClient.get<any>(url, { headers });
  
        return request.pipe(
          tap((response) => {
            console.log('Backend Response:', response);
          }),
          catchError((error) => this.handleError(error))
        );
      })
    );
  }
  
  private handleError(error: any): Observable<{ success: boolean; message: string; data: any[]; location: any | null }> {
    console.error('Error fetching houses:', error);
    return of({
      success: false,
      message: 'An error occurred while fetching house data.',
      data: [],
      location: null,
    });
  }
  
  geMappingCountry(): Observable<any> {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}mapping`;
        return this.httpClient.get<any>(url, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );
  }

  //for admi
  getallHousesLocations(): Observable<any> {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}alllocations`;
        return this.httpClient.get<any>(url, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );
  }
  //return single line json array
  getallformattedlocations(): Observable<any> {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrl}formattedlocations`;
        return this.httpClient.get<any>(url, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );
  }

}


// this.apikeyusertokenService.createHeaders(false).subscribe({next:()=>{},error(err) {
       
// },})




