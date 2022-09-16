import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MyAlert } from 'src/app/interfaces/MyAlert';
import { House } from 'src/app/interfaces/house';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  public house: House = new House();
  constructor( private router: Router, private validator: ValidatorService, private houseService: HomeService, private loaclaStorage: LoaclstoarageService) { }
  public loc: any;
  public housedata: any;
  public myalert:MyAlert={message:""};
  value:any;
  ngOnInit(): void {


     this.value = this.loaclaStorage.GetData(this.loaclaStorage.catogorykey);
   // alert(value.catagoryrefereceId + " " + value.catagory)
    this.house.header = this.value.catagory;
    var reselt = this.loaclaStorage.GetData(this.loaclaStorage.usertoken);
   

   
    if (reselt == null || reselt == undefined) {
      this.router.navigateByUrl("/login")
    }
    this.onback();
    {
      navigator.geolocation.getCurrentPosition((response) => {
        let al = response.coords.altitude
        let lat = response.coords.latitude;
        let lon = response.coords.longitude;

        console.log("alt : " + al + "lat ; " + lat + " long " + lon);

        this.loc = "altitude :  " + al + " lat : " + lat + lon + " long " + lon;


      });

    }
  }

  onback() {
    let myobj = this.loaclaStorage.GetData(this.loaclaStorage.houseforPostkey)
    if (myobj != null) {

      this.house.houseid = myobj.houseid;
      this.house.header = this.value.catagory;
      this.house.Description = myobj.Description;
      this.house.price = myobj.price;
      this.house.phone = myobj.phone;
    }

  }

   message:any
  contineu() {

    if (this.validator.IsVaNotlEmpty(this.house.header) == true && this.validator.IsVaNotlEmpty(this.house.Description) == true && this.validator.IsVaNotlEmpty(this.house.price) == true && this.validator.IsVaNotlEmpty(this.house.phone) == true) {

      if (this.house != null) {
        this.house.houseid = this.makeid(10);
        this.housedata = this.house;
      }
      this.loaclaStorage.SetData(this.loaclaStorage.houseforPostkey, JSON.stringify(this.housedata))
      this.router.navigateByUrl("/address");
    }
    else
    {
      
       // = "All field required!";
        //alert("All field required!")
       this.message = "All field required!";
       this.myalert.message = "All field required!";
    }

  }
  //create random id
  makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  formatString(val: any) {
    var len = val.length;
    //  if(len > )
  }


}
