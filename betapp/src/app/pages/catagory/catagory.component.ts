import { Component, OnInit } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { MyAlert } from 'src/app/interfaces/MyAlert';
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
  catagorylists: any;
  public myalert:MyAlert={message:""};
  constructor( private router: Router, private houseService: HomeService, private loaclaStoarage: LoaclstoarageService) { }

  ngOnInit(): void {
    this.GetDesc();
    this.GetCatagoryList();
  }
  continue() {
    

    if(this.checkedValue == undefined|| null)
    {
    
       this.myalert.message = "እባክዎን ከላይ ካለው ዝርዝር ውስጥ አስቀድመው ይምረጡ";
    
    }
    else
    {
      this.router.navigateByUrl('/upload');
    }
  
  }

  enableandDisableButtons() {
    // const input = document.getElementById('submit') as HTMLInputElement | null;


    // // ✅ Set disabled attribute
    // input?.setAttribute('disabled', '');


    // ✅ Remove disabled attribute
    // input?.removeAttribute('disabled')

  }

  GetCatagoryList() {
    this.houseService.getCatagories().subscribe((list) => {
      this.catagorylists = list;

    })
  }

  checkedValue:any;
  checkRadioBoxvalue(mrChange: MatRadioChange, key: any, val: any) {
    let mrButton: MatRadioButton = mrChange.source;
    this.checkedValue = mrButton.value;
   

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
