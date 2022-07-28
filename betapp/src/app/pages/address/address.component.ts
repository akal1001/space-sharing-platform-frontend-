import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { Address } from 'src/app/interfaces/address';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor(private router: Router, private storage: LoaclstoarageService, private validator: ValidatorService) { }

  address: Address = new Address();
  addressdata: any;
  IsRadioButtonChedked: any;
  ngOnInit(): void {
    var reselt = this.storage.GetData(this.storage.usertoken);

    if (reselt == null || reselt == undefined) {
      this.router.navigateByUrl("/login")
    }

    this.onback();
  }
  onback() {
    let myobj = this.storage.GetData(this.storage.addressforpostKey)
    if (myobj != null) {

      this.address.city = myobj.city;
      this.address.State = myobj.State;
      this.address.zipCode = myobj.zipCode;
      this.address.street = myobj.street;
    }
  }
  continue() {
    if (this.validator.IsVaNotlEmpty(this.address.city) == true &&
      this.validator.IsVaNotlEmpty(this.address.State) == true &&
      this.validator.IsVaNotlEmpty(this.address.zipCode) == true &&
      this.validator.IsVaNotlEmpty(this.address.street) == true) 
      {
      
        if(this.IsRadioButtonChedked == true)
        {
          this.storage.SetData(this.storage.addressforpostKey, JSON.stringify(this.address));
          this.router.navigateByUrl("/fileuploader")
        }
        else{
          alert("checked radion button")
        }
         
    }
    else {
      alert("all field required")
    }





    // let id = this.makeid(30);

    // let mytoken = this.loaclaStorage.GetData(this.loaclaStorage.usertoken);
    //  alert("mytoken " + mytoken.usertoken)
    // this.houseService.PostHouseService(mytoken.usertoken,id,this.house.HouseRoomeType, this.house.Description, this.house.price, "imageurl", this.house.phone, this.house.city, this.house.State, this.house.zipCode).subscribe((response) => {

    //  // alert(response + "  " + id) ;
    //   if (response = true)
    //   {
    //     alert(id);
    //     this.house.houseid = id;
    //     this.loaclaStorage.SetData(this.loaclaStorage.filetoken, JSON.stringify(this.house))
    //     this.router.navigateByUrl("/address")
    //   }
    //})

  }

  onChange(val: MatRadioChange) {
    this.IsRadioButtonChedked = val.source.checked;
    console.log(val.source.checked);
    this.storage.SetData(this.storage.KEYPRIVATEPUBLICADDRESS, JSON.stringify(val.value))
  }
}
