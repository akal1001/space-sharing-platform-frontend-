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
    // alert(this.id)
    //this.GetDetail(this.id);
    this.userSearchinputCity(this.id)

    window.onpopstate = (event) => {
      // User clicked the back button
      this.id = this._Activatedroute.snapshot.paramMap.get("id");
      this.searchinput = this.id;
      //alert('User clicked the back button' + this.id);
      this.userSearchinputCity(this.id)
      //this.newval(this.id);
    }
  }
  search_value: any = null;
  async userSearchinput() {

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
    //this.router.navigateByUrl('/search')



  }
  goback() {
    this.router.navigateByUrl('/home')
  }
  data: any;
  userSearchinputCity(city: any) {
    this.searchsrvice.SearchServe_In(city).subscribe((result: any) => {
      console.log("new result " + JSON.stringify(result))
      this.data = result;
      //this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))
    })
  }

}
