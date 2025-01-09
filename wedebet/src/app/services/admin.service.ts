import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApikeyusertokenService } from './apikeyusertoken.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = APP_CONFIG.apiUrl + "/version/";

  constructor(private httpClient: HttpClient, private apikeyusertokenService: ApikeyusertokenService) { }

  addVersionServe(version: any): Observable<{ versionResponse: any }> {
    const versionDto = {
      "version": version
    };
    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.post<any>(this.apiUrl + "addversion", versionDto, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }


  getversion():Observable<any> {

    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.get<any>(this.apiUrl + "version",{headers});
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }
}
