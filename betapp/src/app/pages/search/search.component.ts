import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  id:any;
  searchinput: any;
  serarchResult: any = null;
  constructor(private searchsrvice: SearchService, private router: Router,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

    this.id=this._Activatedroute.snapshot.paramMap.get("id");

   // alert(this.id)
    //this.GetDetail(this.id);
    this.userSearchinputCity(this.id)

    window.onpopstate = (event) => {
      // User clicked the back button
      this.id=this._Activatedroute.snapshot.paramMap.get("id");
      //alert('User clicked the back button' + this.id);
      this.userSearchinputCity(this.id)
      //this.newval(this.id);
    }
  }
  userSearchinput() {

    //this.router.navigateByUrl('/search')
   this.searchsrvice.SearchServe(this.searchinput).subscribe((result: any) => {
     console.log(JSON.stringify(result))
     console.log(this.searchinput)
     this.serarchResult = result;
     //this.data = this.serarchResult;
     console.log(this.serarchResult);
     
   })
  

 }
 goback()
 {
   this.router.navigateByUrl('/home')
 }
 data:any;
 userSearchinputCity(city:any) {
   this.searchsrvice.SearchServe(city).subscribe((result: any) => {
     console.log("new result " + JSON.stringify(result))
     this.data = result;
     //this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))
   })
 }
 
}
