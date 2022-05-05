import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() inputFromParent : string | undefined;
   innerWidth: any;
  imgHIght: any;
  searchinput: any;
  serarchResult: any = null;
  constructor(private dataservice: HomeService, private storage: LoaclstoarageService, private router: Router) { }
  public data: any;
  el: any;

  smapleData: any = []
  message:any;
   
  
  ngOnInit(): void {
    this.sampleData = this.storage.GetData(this.storage.tempdataIds);
    this.dataservice.getData().subscribe((response) => {

      this.data = response;
    })

    console.log(this.inputFromParent);
    this.message = this.inputFromParent;
    //this.searchinputFromparent
  }
  test() {
    // alert("test")
    this.serarchResult = null;
  }

  sampleData: any = [];
  idlist: any = new Array();
  gotodetail2(id: any, houseRoomeType: any, description: any, imageFiles: any) {

    this.storage.SetData(this.storage.id, JSON.stringify(id));
    let obj = { id: id, type: houseRoomeType, description: description, img: imageFiles }
    //this.setTempData(JSON.stringify(id));

    

    let da: any[] = this.storage.GetData(this.storage.tempdataIds);

    if (da != null) {
      this.idlist = this.storage.GetData(this.storage.tempdataIds);
    }
    if (this.idlist != null) {
      console.log("length : " + this.idlist.length)

      if(this.idlist.length >=7)
      {
         this.idlist.splice(6,1)
      }
      for (var i = 0; i < this.idlist.length; i++) {
        console.log(this.idlist[i]);
        if (this.idlist[i].id == id) {
          this.idlist.splice(i, 1);
          console.log("similar id found! " + this.idlist[i])

        }
      }
    }

    this.idlist.unshift(obj);
    this.storage.SetData(this.storage.tempdataIds, JSON.stringify(this.idlist));
    // this.sampleData = this.storage.GetData(this.storage.tempdataIds);

   this.router.navigateByUrl("/detail");



    // this.sampleData = this.storage.GetData(this.storage.id);


  }


 

  tempList: any = [];
  setTempData(id: any) {

    //let result = this.storage.GetData(this.storage.tempdata);


  }
   
  ShowImages(id:any)
  {
     
     this.storage.SetData("imgrefids", JSON.stringify(id)); 
     this.router.navigateByUrl("/imageview") 
  }

  key:any;
  GetPublickkey()
  { 
      this.dataservice.GetPublickeySevice().subscribe((response)=>
      {
        this.key = response.houseId;
      
        console.log("key" + this.key);
      })
     
  }

}
