import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../app.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = APP_CONFIG.apiUrl + "/version/";

  constructor(private httpClient: HttpClient) { }

  addVersionServe(version: any): Observable<{ versionResponse: any }> {
    const versionDto = {
      "version": version
    };
    let result = this.httpClient.post<any>(this.apiUrl + "addversion", versionDto);

    return result;
  }

  
  getversion() {
    let result = this.httpClient.get<any>(this.apiUrl + "version");
    return result;
  }
}
