import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private router:Router){

  }
  private dataSubject = new ReplaySubject<any>(1);
  data$ = this.dataSubject.asObservable();

  setData(contactData: any) {
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


  // for filter data
  private filtterDataSubject = new ReplaySubject<any>(1);
  getFilterData$ = this.filtterDataSubject.asObservable();

  setFilterData(data: any) {
    this.filtterDataSubject.next(data);
  }


  //new post found 
  private newPostCountSubject = new ReplaySubject<any>(1);
  dataCountNewPost$ = this.newPostCountSubject.asObservable();

  setNewPostCountData(data: any) {
    this.newPostCountSubject.next(data);
  }



  private editDataSubject = new ReplaySubject<any>(1);
  geEditData$ = this.editDataSubject.asObservable();

  setEditData(data: any) {
    this.editDataSubject.next(data);
  }




  private currentUrlSubject = new ReplaySubject<any>(1);
  getCurrentUrl$ = this.currentUrlSubject.asObservable();

  setCurrentUrlData(data: any) {
    this.currentUrlSubject.next(data);
  }


  private cacheReadySubject = new BehaviorSubject<boolean>(false);

  setCacheReady(isReady: boolean) {
    this.cacheReadySubject.next(isReady);
  }

  getCacheReadyStatus() {
    return this.cacheReadySubject.asObservable();
  }





  navTo(componentName:string){
    this.router.navigate(['/'+ componentName]);
  } 
}
