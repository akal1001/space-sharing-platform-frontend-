import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThemePalette } from '@angular/material/core';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { HomeService } from 'src/app/services/home.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {

  descList:any;
  choosedLists: any = new Array();
  constructor(private router: Router, private houseService:HomeService, private loaclaStoarage: LoaclstoarageService) { }

  ngOnInit(): void { 
    this.GetDesc();
  }
  continue() {
    this.loaclaStoarage.SetData(this.loaclaStoarage.listforpostkey, JSON.stringify(this.choosedLists));
    this.router.navigateByUrl('/upload');
  }
  allComplete: boolean = false;
  lists: any = [
    { key: '1', value: 'value one' },
    { key: '2', value: 'value two' },
    { key: '3', value: 'value three' },
  ];
  checkedvalue: any;
  checkCheckBoxvalue(event: any, val: any) {
    console.log(event.checked);


    if (event.checked == true) {
      this.checkedvalue =  val;
      this.choosedLists.push(this.checkedvalue);

      for (var i = 0; i < this.choosedLists.lenght; i++) {
        console.log(this.choosedLists[i])
      }
    }
    if (event.checked == false) {
      this.choosedLists.pop(val)
    }

  }
  header:any;
  isShown: boolean = false ;
  GetDesc()
  {
   
    let val = this.loaclaStoarage.GetData(this.loaclaStoarage.catogorykey);
   
    if(val.catagoryrefereceId == 'idone')
    {
        this.isShown = true; 
    }
    else
    {
     
      this.houseService.getDescriptionList().subscribe((response)=>{
        this.header = "ያለውን ይምረጡ";
        this.descList = response;
       })
    }
     
  }

}
