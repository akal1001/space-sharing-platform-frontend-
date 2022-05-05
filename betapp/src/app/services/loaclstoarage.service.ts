import { Injectable } from '@angular/core';
const Storage = window.localStorage;
@Injectable({
  providedIn: 'root'
})
export class LoaclstoarageService {
  constructor() { }

  usertoken = "fsdfjf43205vewerj2-35fsa";
  filetoken = "djffsifslfsa0000000lask";
  id = "djfsdfjsadlkfjdsaklfjsadlkfhjkhkjj";
  houseforPostkey = "jfsadfiqirqiuouashfakru238u890";
  addressforpostKey = "98p234rqwf=909uoifhaoifjwrwe";
  cotactforpostkey = "jfoidsf8902r7238-0wefuiufh43hr5oi2";

  tempdata = "sfjq0riqrjweqrqi2roklkfjqwiofjqoj"

  tempdataIds = "itempdataIdssad908435skldfjsaf"
  SetData(key:string, val:string)
  {
     Storage.setItem(key,val)
  }
  GetData(key:string)
  {
     var data = Storage.getItem(key);

   
     if(data !== null)
     {
        return JSON.parse(data);
     }
     else
     {
        return null;
     }
  }
  ClearStorage()
  {
     Storage.clear();
  }
}
