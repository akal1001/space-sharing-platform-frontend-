import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  private dataSubject = new ReplaySubject<string>(1);
  data$ = this.dataSubject.asObservable();
 
  setData(contactData: string) {
    this.dataSubject.next(contactData);
    console.log("data expose");
    
  }
}
