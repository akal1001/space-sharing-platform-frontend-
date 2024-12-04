import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmeharicService } from 'src/app/services/ameharic.service';
import { SearchService } from 'src/app/services/search.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  id: any;
  searchinput: any;
  serarchResult: any = null;
  constructor(private searchsrvice: SearchService, private amharic: AmeharicService, private valdator: ValidatorService, private router: Router, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this._Activatedroute.snapshot.paramMap.get("id");
    this.searchinput = this.id;
    this.valdator.IsStringContaionNoneEngChar(this.id).then((response) => {
      console.log(response)
      if (response === true) {
        this.amharic.ConvertAmeharicCharByCharToEngAlpha(this.id).then((response) => {
          console.log(response);
          this.userSearchinputCity(response,"key");
        })
      }
      else {
        this.userSearchinputCity(this.id,"none");
      }
    })


    // window.onpopstate = (event) => {
      
    //   this.id = this._Activatedroute.snapshot.paramMap.get("id");
    //   this.searchinput = this.id;
    
    //   this.userSearchinputCity(this.id)
    
    // }
  }
  search_value: any = null;
  async userSearchinput() {

    let val = await this.valdator.IsStringContaionNoneEngChar(this.searchinput);
    if (val == true) {
      //console.log("val " + val);
      this.search_value = await this.amharic.ConvertAmeharicCharByCharToEngAlpha(this.searchinput);
      this.searchsrvice.SearchServe(this.search_value, "key").subscribe((result: any) => {
        //console.log(JSON.stringify(result))
        //console.log(this.searchinput)
        this.serarchResult = result;
        //this.data = this.serarchResult;
        //console.log(this.serarchResult);

      })
    }
    else {
      this.searchsrvice.SearchServe(this.searchinput, "none").subscribe((result: any) => {
        console.log(JSON.stringify(result))
        console.log(this.searchinput)
        this.serarchResult = result;
        //this.data = this.serarchResult;
        console.log(this.serarchResult);

      })
    }
    //this.router.navigateByUrl('/search')



  }
  goback() {
    this.router.navigateByUrl('/home')
  }
  data: any;
  userSearchinputCity(city: any, languagekey:any) {
    this.valdator.IsStringContaionNoneEngChar(city).then((response)=>{
      if(response === true)
      {
        this.searchsrvice.SearchServe_In(city,'key').subscribe((result: any) => {
          // console.log("new result " + JSON.stringify(result))
          this.data = result;
          //this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))
        })
      }
      else
      {
        this.searchsrvice.SearchServe_In(city, 'languagekey').subscribe((result: any) => {
          // console.log("new result " + JSON.stringify(result))
          this.data = result;
          //this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))
        })
      }
    })
   
  }

  userSearchinputCity2(city: any) {
    
    this.valdator.IsStringContaionNoneEngChar(city).then((response)=>{
      if(response === true)
      {
        this.amharic.ConvertAmeharicCharByCharToEngAlpha(city).then((response)=>{
          this.searchsrvice.SearchServe_In(response,'key').subscribe((result: any) => {
            // console.log("new result " + JSON.stringify(result))
            this.data = result;
            //this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))
          })
        })
       
      }
      else
      {
        this.searchsrvice.SearchServe_In(city, 'none').subscribe((result: any) => {
          // console.log("new result " + JSON.stringify(result))
          this.data = result;
          //this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))
        })
      }
    })
   
  }

}
