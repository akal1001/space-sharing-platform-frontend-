import { Component, OnInit, Input } from '@angular/core';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { AmeharicService } from 'src/app/services/ameharic.service';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { SearchService } from 'src/app/services/search.service';
import { ValidatorService } from 'src/app/services/validator.service';

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
  constructor(private searchsrvice: SearchService, private amharic:AmeharicService, private valdator:ValidatorService, private dataservice: HomeService, private storage: LoaclstoarageService, private router: Router) { }
  public data: any;
  el: any;

  smapleData: any = []
  message: any;
  catagorylists: any;

  ngOnInit(): void {

   
    this.onpageload();
    //this.searchinputFromparent
  }
 
  search_value:any = null;
 async userSearchinput() {

     //this.router.navigateByUrl('/search')
    // this.searchsrvice.SearchServe(this.searchinput,'key').subscribe((result: any) => {
   
    //   this.serarchResult = result;
    
    //   this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))
    // })
   

    
    let val = await this.valdator.IsStringContaionNoneEngChar(this.searchinput);
    if (val == true) {
      console.log("val " + val);
      this.search_value = await this.amharic.trnsletToEngAlphWhileTyping(this.searchinput);
      this.searchsrvice.SearchServe(this.search_value, "key").subscribe((result: any) => {
        console.log(JSON.stringify(result))
        console.log(this.searchinput)
        this.serarchResult = result;
        //this.data = this.serarchResult;
        console.log(this.serarchResult);

      })
    }
    else
    {
      this.searchsrvice.SearchServe(this.searchinput, "none").subscribe((result: any) => {
        console.log(JSON.stringify(result))
        console.log(this.searchinput)
        this.serarchResult = result;
        //this.data = this.serarchResult;
        console.log(this.serarchResult);

      })
    }

    this.inputFromParent = this.searchinput;
  }
  onpageload() {
    this.sampleData = this.storage.GetData(this.storage.tempdataIds);

    var value = this.storage.GetData(this.storage.DefaultHomeData);
    if (value != null || value != undefined) {
      this.data = value;
    }
    //alert(value);
    this.dataservice.getData().subscribe((response: any) => {

      this.storage.SetData(this.storage.DefaultHomeData, JSON.stringify(response));
      this.data = response;

      //  console.log(JSON.stringify(this.data));
    })

   // console.log(this.inputFromParent);
    this.message = this.inputFromParent;

    this.GetCatagoryList();
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

      //console.log("key" + this.key);
    })

  }

  GetCatagoryList() {
    this.dataservice.getCatagoriesForHome().subscribe((list) => {
      this.catagorylists = list;

    })
  }


  checkedvalue: any;
  checkCheckBoxvalue(event: any, catagoryrefereceId: any, value: any) {

   // console.log(event);
    if (event.checked == true) {
      this.checkedvalue = catagoryrefereceId;

      this.choosedLists.push(this.checkedvalue);

      for (var i = 0; i < this.choosedLists.length; i++) {
       // console.log("checked catagory list " + this.choosedLists[i])
      }
    }
    if (event.checked == false) {
      this.choosedLists.pop(catagoryrefereceId)
    }


    if (this.choosedLists.length > 0) {
      this.dataservice.GetHouseByCatagory(this.choosedLists).subscribe((resposne) => {


        if (resposne.length > 0) {
          this.data = resposne;
        }

        // console.log(JSON.stringify(resposne))
      })

    }
    if (this.choosedLists.length == 0) {
      this.onpageload();
    }

  }
}
