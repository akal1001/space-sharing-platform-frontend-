import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThemePalette } from '@angular/material/core';

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


  choosedLists:any = new Array();
  constructor(private router: Router) {}

  ngOnInit(): void {}
  continue() {

    this.imageArray.push(this.imageurl);

    // alert(this.imageurl + ";;")

    this.loaclaStoarage.SetData(this.loaclaStoarage.filetoken, JSON.stringify(this.imageArray));
    this.router.navigateByUrl('/fileuploader');
  }


  allComplete: boolean = false;


  lists: any = [
    { key: '1', value: 'two and half bothroom' },
    { key: '2', value: 'single bedroom' },
    { key: '3', value: 'enought parking space' },
  ];

  checkedvalue:any;
  checkCheckBoxvalue(event: any, val:any) {
    console.log(event.checked);


    if(event.checked == true)
    {
       this.checkedvalue = this.checkedvalue + val;
       this.choosedLists.push(this.checkedvalue);

       for(var i = 0;i < this.choosedLists.lenght; i++)
       {
            console.log(this.choosedLists[i])
       }
    }
    if(event.checked == false)
    {
        this.choosedLists.pop(val)
    }

  }

}
