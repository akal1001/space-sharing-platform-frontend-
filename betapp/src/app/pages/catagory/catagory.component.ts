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

  descList: any;
  choosedLists: any = new Array();
  catagorylists:any;
  constructor(private router: Router, private houseService: HomeService, private loaclaStoarage: LoaclstoarageService) { }

  ngOnInit(): void {
    this.GetDesc();
    this.GetCatagoryList();
  }
  continue() {
    // this.loaclaStoarage.SetData(this.loaclaStoarage.catogorykey, JSON.stringify(this.choosedLists));
    this.router.navigateByUrl('/upload');
  }


  GetCatagoryList()
  {
     this.houseService.getCatagories().subscribe((list)=>{
    this.catagorylists = list;

     })
  }

  checkRadioBoxvalue(key: any, val: any) {
    let obj = { catagoryrefereceId: key, catagory: val };

    this.loaclaStoarage.SetData(this.loaclaStoarage.catogorykey, JSON.stringify(obj));

    // var value = this.loaclaStoarage.GetData(this.loaclaStoarage.catogorykey);
    // alert(value.catagoryrefereceId + " " + value.catagory)


  }

  GetDesc() {
    this.houseService.getDescriptionList().subscribe((response) => {
      this.descList = response;
    })
  }

}
