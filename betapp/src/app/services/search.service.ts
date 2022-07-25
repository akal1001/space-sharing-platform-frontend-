import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _baseUploadUrl = environment.baseurl + "search/"
  constructor(private httpClient: HttpClient) { }

  d: any = [{ "name": "John", "age": 30, "car": null }];


  SearchServe(input: any): Observable<any> {


    let result = this.httpClient.get<any>(this._baseUploadUrl + "search", {
      params: {
        q: input
      },
    });

    return result;
  }


}
