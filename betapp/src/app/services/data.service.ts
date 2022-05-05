import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = new BehaviorSubject('default data');
  data$ = this.data.asObservable();

  changeData(data: string) {
    this.data.next(data)
  }
}
