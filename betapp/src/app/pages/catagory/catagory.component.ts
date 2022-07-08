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

  GetDesc()
  {
     this.houseService.getDescriptionList().subscribe((response)=>{
      this.descList = response;
     })
  }

}
