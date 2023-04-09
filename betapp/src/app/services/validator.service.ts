import { Injectable } from '@angular/core';
import { LoaclstoarageService } from './loaclstoarage.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(private storage: LoaclstoarageService) { }

  IsVaNotlEmpty(val: any) {
    if (val == undefined || val == null || val == "") {
      return false;
    }
    else {
      return true;
    }
  }

  //return true if non eng  char exist
  async IsStringContaionNoneEngChar(val: any) {
    const nonEnglishRegExp = /[^\u0000-\u007F]/;
    return nonEnglishRegExp.test(val);
  }
 
}
