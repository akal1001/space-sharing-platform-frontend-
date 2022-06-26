import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { House } from '../interfaces/house';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _baseUploadUrl = environment.baseurl + 'house/';
  constructor(private _httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this._httpClient.get(this._baseUploadUrl + 'getallhouses')
  }
  getDataWithOption(val:any): Observable<any> {
    return this._httpClient.get(this._baseUploadUrl + 'getallhouses?sortOptions='+ val)
  }

  //return all house
  GetAllHouseService(): Observable<House> {
    return this._httpClient.get<House>(this._baseUploadUrl);
  }
  //return all house by zipcode or city
  GetHouseBYZipOrCityService(zipOrCity: any): Observable<House> {
    return this._httpClient.get<House>(this._baseUploadUrl + '/' + zipOrCity);
  }
  //return house info by its id
  GetHouseService(houseId: any): Observable<House> {
    return this._httpClient.get<House>(this._baseUploadUrl + 'GetHouseById?houseId=' + houseId);
  }

  //return house info by its id
  GetHouseByCityService(city: any): Observable<House> {
    return this._httpClient.get<House>(this._baseUploadUrl + 'GetHouseByCity?city=' + city);
  }


  // public IActionResult Post(string usertoken, string type, string description, string imageurl, string phone, string city, string state, int zip)

  PostHouseService(usertoken: string, id: string, type: string, description: string, price: number, imageurl: any,
    phone: string, city: string, state: string, zip: number): Observable<boolean> {
    let endpoint = "PostHouse?usertoken=" + usertoken
      + "&id=" + id
      + "&type=" + type
      + "&description=" + description
      + "&price=" + price
      + "&imageurl=" + "null"
      + "&phone=" + phone
      + "&city=" + city
      + "&state=" + state
      + "&zip=" + zip

    return this._httpClient.post<boolean>(this._baseUploadUrl + endpoint, "");

  }
  //edit house
  PutAddressService(_house: House): Observable<Boolean> {
    return this._httpClient.put<boolean>(
      this._baseUploadUrl + '/putHouse',
      _house,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }
  //delete house
  DeleteHouseService(houseId: string, usertoken: any): Observable<boolean> {
    console.log('Delete house Id ', houseId);
    return this._httpClient.delete<boolean>(
      this._baseUploadUrl + 'deleteHouse?houseId='
      + houseId
      + "&usertoken=" + usertoken
    );
  }

  PostHouseServiceTest(val: any): Observable<any> {
    let endpoint = 'postobj?val'

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._httpClient.post<any>(this._baseUploadUrl + endpoint, JSON.stringify(val),
      { headers: headers });


  }

  PostHousekeyowerdService(key: any, refid: any): Observable<boolean> {
    let endpoint = "keyword?key=" + key + "&refid=" + refid;
    return this._httpClient.post<boolean>(this._baseUploadUrl + endpoint, "")
  }

  GetHouseImages(id: any):Observable<any> {
    let endpoint = "houseimages?refid=" + id;
    return this._httpClient.get<any>(this._baseUploadUrl + endpoint)
  }
  GetPublickeySevice():Observable<any>
  {
   
     return this._httpClient.get<any>(this._baseUploadUrl + 'PublicKey');
  }
}

