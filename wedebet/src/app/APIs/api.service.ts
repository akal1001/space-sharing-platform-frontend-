import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = APP_CONFIG.apiUrl;
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get( this.apiUrl+'/house/Catagoriesforhome');
  }

  getallhouseData(): Observable<any> {
    return this.http.get(this.apiUrl+'/house/getallhouses')
  }
}
