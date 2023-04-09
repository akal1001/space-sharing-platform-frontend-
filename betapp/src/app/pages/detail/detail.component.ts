import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { House } from 'src/app/interfaces/house';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  test:any = "uploading "

  id:any;
  bigimg:any;
  constructor(private router: Router,private storage: LoaclstoarageService,private searchService:SearchService, private homeservice: HomeService, private _Activatedroute:ActivatedRoute) {
}
  images: any = new Array<Object>();
  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.GetDetail(this.id).then((rsponse)=>{
       this.test = null;
       console.log(this.test)
    });
    console.log(this.test)
  }


  imageObject: any = new Array();
  house: any;
  async GetDetail(id:any) {
    window.scroll(0,0);
   // let id = this.storage.GetData(this.storage.id);

    this.homeservice.GetHouseService(id).subscribe((response: any) =>
    {
      this.house = response;
      this.bigimg = this.house?.imageFiles[0].imageUrl
      for (var i = 0; i < this.house.imageFiles.length; i++)
      {
        let imageObject: any = {
          image: this.house?.imageFiles[i].imageUrl,
          thumbImage: this.house?.imageFiles[i].imageUrl,
          // title: 'title of image'
        }
        this.imageObject.push(imageObject);
      }
      this.userSearchinput();
    });
   
  }
  CHANGEimqge(val:any)
  {
     this.bigimg = val;
  }
 

 

  
  data:any;
  userSearchinput() {



    this.searchService.SearchServe(this.house.address.city,'key').subscribe((result: any) => {

      console.log("new result " + JSON.stringify(result))

      this.data = result;

      this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))



    })



  }

}
