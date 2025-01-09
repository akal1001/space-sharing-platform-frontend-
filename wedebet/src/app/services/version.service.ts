import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { APP_CONFIG } from '../app.config';
import { ApikeyusertokenService } from './apikeyusertoken.service';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private apiUrl = APP_CONFIG.apiUrl + "/version/";
  constructor(private httpClient: HttpClient, private apikeyusertokenService: ApikeyusertokenService) { }

  GetVersionServe(): Observable<{ success: boolean, status: string, data: string, message: string }> {

    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        return this.httpClient.get<any>(this.apiUrl + "version", { headers });;
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }
}
