import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { RsaService } from 'src/app/services/rsa.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  imgurls: any;
  house: any;
  address: any;
  result: any = {};
  uploadresponse: any;
  imageObject: any = new Array();
  constructor(private rsaservice: RsaService, private storage: LoaclstoarageService, private router: Router, private houseService: HomeService, private loaclaStorage: LoaclstoarageService) { }

  ngOnInit(): void {
    var reselt = this.loaclaStorage.GetData(this.loaclaStorage.usertoken);

    if (reselt == null || reselt == undefined) {
      this.router.navigateByUrl("/login")
    }
    this.Review();
  }

  Review() {
    this.address = this.storage.GetData(this.storage.addressforpostKey);
    this.house = this.storage.GetData(this.storage.houseforPostkey);
    this.imgurls = this.storage.GetData(this.storage.filetoken)


    if (this.address != null) {

      let key;
      for (key in this.house) {
        if (this.house.hasOwnProperty(key)) {
          this.result[key] = this.house[key];
        }
      }

      for (key in this.address) {
        if (this.address.hasOwnProperty(key)) {
          this.result[key] = this.address[key];
        }
      }
      for (key in this.imgurls) {
        if (this.imgurls.hasOwnProperty(key)) {
          this.result[key] = this.imgurls[key];

          this.imgs(this.imgurls[key])
        }
      }
    }
  }


  imgs(imgurl: any) {
    let imageObject: any = {
      image: imgurl,
      thumbImage: imgurl,
      // title: 'title of image'
    }
    this.imageObject.push(imageObject);
  }
  post() {

    let detailLists = this.storage.GetData(this.storage.listforpostkey);
    let images = this.storage.GetData(this.storage.filetoken);
    let val = this.storage.GetData(this.storage.catogorykey)
    let addressPublicOrPrivate = this.storage.GetData(this.storage.KEYPRIVATEPUBLICADDRESS);

    // alert(addressPublicOrPrivate)
    let obj = {
      usertoken: this.storage.GetData(this.storage.usertoken).usertoken,
      catagory: val.catagory,
      catagoryReferenceId: val.catagoryrefereceId,
      header: this.result.header,
      Description: this.result.Description,
      phone: this.result.phone,
      price: this.result.price,
      State: this.result.State,
      city: this.result.city,
      zipCode: this.result.zipCode,
      street: this.result.street,
      detailLists: detailLists,
      Images: images,
      IsAddressPublic: addressPublicOrPrivate,
    }

    this.houseService.PostHouseServiceTest(obj).subscribe((response) => {
      this.uploadresponse = response
    })
  }
}
