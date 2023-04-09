import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoaclstoarageService } from './loaclstoarage.service';

@Injectable({
  providedIn: 'root'
})
export class AmeharicService {

  private _baseUploadUrl = environment.baseurl + 'Ameharic/';

  constructor(private _httpClient: HttpClient, private storage:LoaclstoarageService) { }
  //post alph
  PostAmeharicAlphSerivce(val: any): Observable<any> {
    let endpoint = 'PostAmricAlpha?val'

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._httpClient.post<any>(this._baseUploadUrl + endpoint, JSON.stringify(val),
      { headers: headers });


  }
  ReturnAllAlph(): Observable<any> {
    return this._httpClient.get(this._baseUploadUrl + 'GetAllAmeharicAlph')
  }

   //retrun transeted eng string
   async transletToEngAlph(val: any) {
    let translatedWord = null;
    for (var i = 0; i < val.length; i++) {
      if (translatedWord == null) {
        translatedWord = this.storage.GetDatatest(val[i]);
      }
      else {
        translatedWord = translatedWord + this.storage.GetDatatest(val[i]);
      }
    }
    return translatedWord;
  }

  //trnslet workd whil typine
  async trnsletToEngAlphWhileTyping(val:any)
  {
    let search_value = null;
   
   // this.wordList = this.searchinput;
    
    for (var i = 0; i < val.length; i++) {

      let sv = this.storage.GetDatatest(val[i]);
    
      if (sv != null) {
        if (search_value != null) {

           search_value = search_value + sv;
        }
        else {
           search_value = sv;
        }
      }
      else {
        if (search_value != null) {

           search_value = search_value + " ";
        }
        else {
          search_value = " ";
        }
      }
    }
    return search_value;
  }
}
