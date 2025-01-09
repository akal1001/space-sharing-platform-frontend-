import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
import { catchError, map, Observable, switchMap, take, throwError } from 'rxjs';
import { ApikeyusertokenService } from './apikeyusertoken.service';
@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private apiUrl = APP_CONFIG.apiUrl + "/s3/";

  constructor(private httpClient: HttpClient, private apikeyusertokenService: ApikeyusertokenService) {}
  
  DeleteImageFromS3(key: string, imgId: string): Observable<any> {

    return this.apikeyusertokenService.createHeaders(true).pipe(
      switchMap((headers) => {
        return this.httpClient.delete<any>(`${this.apiUrl}delete?keyName=${key}&imageId=${imgId}`, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => error);
      })
    );
  }
}
