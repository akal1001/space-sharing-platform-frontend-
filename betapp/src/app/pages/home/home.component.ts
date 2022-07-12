import { Component, OnInit, Input } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
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
  @Input() inputFromParent: string | undefined;
  innerWidth: any;
  imgHIght: any;
  searchinput: any;
  serarchResult: any = null;
  choosedLists: any = new Array();
  constructor(private dataservice: HomeService, private storage: LoaclstoarageService, private router: Router) { }
  public data: any;
  el: any;

  smapleData: any = []
  message: any;
  catagorylists:any;

  ngOnInit(): void {
    this.sampleData = this.storage.GetData(this.storage.tempdataIds);

    var value = this.storage.GetData(this.storage.DefaultHomeData);
    if (value != null || value != undefined) {
      this.data = value;
    }
    //alert(value);
    this.dataservice.getData().subscribe((response: any) => {

      this.storage.SetData(this.storage.DefaultHomeData, JSON.stringify(response));
      this.data = response;

      // alert(JSON.stringify(this.data));
    })

    console.log(this.inputFromParent);
    this.message = this.inputFromParent;

    this.GetCatagoryList();
    //this.searchinputFromparent
  }

  selectedPriceValue: any;
  onChange(mrChange: MatRadioChange) {

    let mrButton: MatRadioButton = mrChange.source;

    this.selectedPriceValue = mrButton.value;

    this.dataservice.getDataWithOption(this.selectedPriceValue).subscribe((response: any) => {

      this.data = response;
    })

  }


  test() {
    // alert("test")
    this.serarchResult = null;
  }

  sampleData: any = [];
  idlist: any = new Array();
 




  tempList: any = [];
  setTempData(id: any) {

    //let result = this.storage.GetData(this.storage.tempdata);


  }

  ShowImages(id: any) {

    this.storage.SetData("imgrefids", JSON.stringify(id));
    this.router.navigateByUrl("/imageview")
  }

  key: any;
  GetPublickkey() {
    this.dataservice.GetPublickeySevice().subscribe((response: { houseId: any; }) => {
      this.key = response.houseId;

      console.log("key" + this.key);
    })

  }

  GetCatagoryList()
  {
     this.dataservice.getCatagories().subscribe((list)=>{
    this.catagorylists = list;

     })
  }

  checkedvalue: any;
  checkCheckBoxvalue(event: any, id:any, value:any) {
 
    let list:any = 
    console.log(event);


    if (event.checked == true) {
      this.checkedvalue =  id;
      
      this.choosedLists.push(this.checkedvalue);

      for (var i = 0; i < this.choosedLists.lenght; i++) {
        console.log(this.choosedLists[i])
      }
    }
    if (event.checked == false) {
      this.choosedLists.pop(id)
    }

  }
}
