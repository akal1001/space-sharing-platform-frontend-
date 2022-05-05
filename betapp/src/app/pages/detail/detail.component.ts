import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/interfaces/house';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private storage: LoaclstoarageService, private homeservice: HomeService) { }
  images: any = new Array<Object>();
  ngOnInit(): void {
    this.GetDetail();
  }

  imageObject: any = new Array();
  house: any;
  GetDetail() {
    let id = this.storage.GetData(this.storage.id);
  
    this.homeservice.GetHouseService(id).subscribe((response) => {
      this.house = response;
      for (var i = 0; i < this.house.imageFiles.length; i++) {
        let imageObject: any = {
          image: this.house?.imageFiles[i].imageUrl,
          thumbImage: this.house?.imageFiles[i].imageUrl,
          // title: 'title of image'
        }
        this.imageObject.push(imageObject);
      }
    });
  }


  tempList: any = [];
  getTempData() {
    this.storage.GetData(this.storage.tempdata)
    {

    }
  }
  setTempData(newdata: any) {
    //detail house obj
    let result = this.storage.GetData(this.storage.tempdata)

    for (var i = 0; i < this.tempList.length; i++)
    {
      if (this.tempList[i].houseId = newdata.houseId) 
      {
        this.tempList[i].houseId.remove();
        break;
      }

    }
    this.tempList.push(newdata);
    this.storage.SetData(this.storage.tempdata, this.tempList);
  }

}
