import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.css']
})
export class CatagoryComponent implements OnInit {

  descList:any;
  choosedLists: any = new Array();
  constructor(private router: Router, private houseService:HomeService, private loaclaStoarage: LoaclstoarageService) { }

  ngOnInit(): void { 
    this.GetDesc();
  }
  continue() {
   // this.loaclaStoarage.SetData(this.loaclaStoarage.catogorykey, JSON.stringify(this.choosedLists));
    this.router.navigateByUrl('/upload');
  }
 
  lists: any = [
    { key: '1', value: 'የሚከርይ ክፊለ' },
    { key: '2', value: 'የሚከራይ ሙሉ ባት' },
    { key: '3', value: 'ሽቲ ባት' },
    { key: '5', value: 'ሚከርይ ክፊለ' },
    { key: '6', value: 'የይ ሙሉ ባት' },
    { key: '7', value: 'ት' },
  ];
 
  checkRadioBoxvalue(val: any) {
  
    this.loaclaStoarage.SetData(this.loaclaStoarage.catogorykey,JSON.stringify(val));
    console.log(val);
   
   var value =  this.loaclaStoarage.GetData(this.loaclaStoarage.catogorykey);
   console.log(value);
  

  }

  GetDesc()
  {
     this.houseService.getDescriptionList().subscribe((response)=>{
      this.descList = response;
     })
  }

}
