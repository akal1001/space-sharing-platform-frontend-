import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = APP_CONFIG.apiUrl + "/house/upload";

  constructor(private httpClient: HttpClient) { }
  uploadHouse(uploadHouseRequest: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.httpClient.post(this.apiUrl, uploadHouseRequest, { headers });
  }

}
