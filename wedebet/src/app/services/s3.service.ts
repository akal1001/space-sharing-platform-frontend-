import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
import { map, Observable, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class S3Service {
  private apiUrl = APP_CONFIG.apiUrl + "/s3/";

  constructor(private httpClient: HttpClient, private accountService: AccountService) {

  }
  DeleteImageFromS3(key: string, imgId:string): Observable<any> {
    return this.accountService.ReturnUserDataFromLocalStorage().pipe(
      take(1), // Ensures only one emission
      map((response) => response?.token),
      switchMap((token) => {
        if (!token) {
          throw new Error('Token is null or undefined');
        }
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.delete<any>(`${this.apiUrl}delete?keyName=${key}&imageId=${imgId}`, { headers });
      })
    );
  }
  
}
