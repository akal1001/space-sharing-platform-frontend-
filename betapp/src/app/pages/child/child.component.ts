import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() inputFromParent: any | undefined;
  @Output() inputChange = new EventEmitter<any>();
  constructor(private houseService: HomeService, private storage: LoaclstoarageService, private router: Router) { }
  msg: any;
  ngOnInit(): void {
    this.msg = this.inputFromParent;


    this.inputChange.emit(this.inputFromParent);
    console.log("mes " + this.inputFromParent)
  }

  // getdata(val:any)
  // {
  //    this.houseService.GetHouseByCityService(val).subscribe((response)=>
  //    {

  //    })
  // }

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

      if (this.idlist.length >= 7) {
        this.idlist.splice(6, 1)
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


    this.inputFromParent = null;
    this.router.navigateByUrl("/detail");
   


    // this.sampleData = this.storage.GetData(this.storage.id);


  }


}
