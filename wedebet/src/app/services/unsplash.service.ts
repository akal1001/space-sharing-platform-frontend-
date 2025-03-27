import { Injectable } from '@angular/core';
import { Unsplash_API_Config } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { ApikeyusertokenService } from './apikeyusertoken.service';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private apiUrl = `${Unsplash_API_Config.apiUrl}/photos`;
  private clientId = Unsplash_API_Config.key;

  private apiUrlAws = `${Unsplash_API_Config.apiUrlAws}/photos`;

  constructor(private http: HttpClient, private apikeyusertokenService: ApikeyusertokenService) {}
 //constructor(private httpClient: HttpClient, private indexeddbService:IndexeddbService,  private apikeyusertokenService: ApikeyusertokenService) {

  getPhotos(query: string): Observable<any> {
    const url = `${this.apiUrl}?query=${query}&client_id=${this.clientId}`;
    return this.http.get(url);
  }

  getPhotoss(query: string): Observable<any> {
    return this.apikeyusertokenService.createHeaders(false).pipe(
      switchMap((headers) => {
        const url = `${this.apiUrlAws}?query=${encodeURIComponent(query)}`; // Append query parameter
        return this.http.get<any>(url, { headers });
      }),
      catchError((error) => {
        console.error('Error fetching photos:', error);
        return throwError(() => error); // Re-throw the error for the caller to handle
      })
    );
  }
  
}
