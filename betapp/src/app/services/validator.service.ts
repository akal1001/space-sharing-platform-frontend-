import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  IsVaNotlEmpty(val: any) {
    if (val == undefined || val == null || val == "") {
      return false;
    }
    else {
      return true;
    }
  }
}
