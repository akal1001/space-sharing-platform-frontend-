import { Injectable } from '@angular/core';
const Storage = window.localStorage;
@Injectable({
  providedIn: 'root'
})
export class LoaclstoarageService {
  constructor() { }

  usertoken = "6XOOXS16O7Y2DG49M9HA5UEBW0MUC4PRMYQUWLOTLO6XOOXS16O7Y2DG49M9HA5U8UUJ0X9P";
  filetoken = "567OOXS16O7Y2DG49M9HA5U8BVPKTUQWID43FQS3UUJ0X9P";
  id = "C4PRMYQUWLOTLO6XOOXS16O7Y2DG49M9HA5U8WXZCNDBVPKTUQWID43FQS3UUJ0X9P";
  houseforPostkey = "EBW0MUC4PRMYQUWLOWXZCNDBVPKTUQWID43";
  addressforpostKey = "UYNMEBW0MUC4PRMYQUWLOTLO6XOOXS16O7Y2DG49M9HA5U8WXZCNDBVPKTUQWID43FQS3UUJ0X9P";
  cotactforpostkey = "EBW0MUC4PRMYQU43FQS3UUJ0X9P";
  listforpostkey = "LOTLO6XOOXS16O7Y2DG49M9HA5U8WXZCNDBVPKTUQWID43EBW0MUC4PRMYQUWFQS3UUJ0X9P";

  tempdata = "EOL7YYYGFDBW0MUC4PRU8W2DG49M9HA5U8WX"

  tempdataIds = "YUIBRRSWJOEBW9M9HA5U8WXZCNDBVPKTUQWID43F";

  DefaultHomeData = "67767HHEBW0MUCS3UUJ0X9P";

  SearchedDatakey = "XS16O7Y2DG49M9HA5U8WO6XOOXS16O7Y2DG49MKTUJ0X9P";

  SearchedSelectValueDatakey = "M9HA5U8WO66O7Y2DG49MKTUQWI7Y2DG49";
  catogorykey = "catM9HA5U8WO6XOOXS16O7Y2DPRMYQUWLOTL6XOOUJ0X9PXS16O7Y2DG49";

  catagoryListKey = "catagoryListKeycatM9HA5U8WO6XOOXS16O7Y2DPRMYQUWLOTL6XOOUJ0X9PXS16O7Y2DG49"
  KEYPRIVATEPUBLICADDRESS = "Y2DPRMYQUWLOTL6XOOUJ0X9PXS16O9080987Y2D"
 
 
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


  SetDatatest(key:string, val:string)
  {
     Storage.setItem(key,val)
  }
  GetDatatest(key:string)
  {


     var data = Storage.getItem(key);

     return data;
    
  }
}
