import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new ReplaySubject<string>(1);
  data$ = this.dataSubject.asObservable();

  setData(contactData: string) {
    this.dataSubject.next(contactData);
  }

  
  
  private userDataSubject = new ReplaySubject<string>(1);
  userdata$ = this.userDataSubject.asObservable();

  setUserData(userData: string) {
    this.userDataSubject.next(userData);
  }

  private isUserLoggedInSubject = new ReplaySubject<boolean>(1);
  IsUserloginData$ = this.isUserLoggedInSubject.asObservable();

  setloginSucessData(successData: boolean) {
    this.isUserLoggedInSubject.next(successData);
   
  }
}
