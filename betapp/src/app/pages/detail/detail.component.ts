import { Component, OnInit } from '@angular/core';
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
  id:any;
  constructor( router: Router,private storage: LoaclstoarageService,private searchService:SearchService, private homeservice: HomeService, private _Activatedroute:ActivatedRoute) {


    router.events
    .pipe(
      // The "events" stream contains all the navigation events. For this demo,
      // though, we only care about the NavigationStart event as it contains
      // information about what initiated the navigation sequence.
      filter(
        ( event: any ) => {

          return( event instanceof NavigationStart );

        }
      )
    )
    .subscribe(
      ( event: NavigationStart ) => {

        console.group( "NavigationStart Event" );
        // Every navigation sequence is given a unique ID. Even "popstate"
        // navigations are really just "roll forward" navigations that get
        // a new, unique ID.
        this.id=this._Activatedroute.snapshot.paramMap.get("id");
        this.GetDetail(this.id);
        console.log( "navigation id:", event.id );
        //this.GetDetail(event.id)
        console.log( "route:", event.url );

       
        // The "navigationTrigger" will be one of:
        // --
        // - imperative (ie, user clicked a link).
        // - popstate (ie, browser controlled change such as Back button).
        // - hashchange
        // --
        // NOTE: I am not sure what triggers the "hashchange" type.
        console.log( "trigger:", event.navigationTrigger );

        // This "restoredState" property is defined when the navigation
        // event is triggered by a "popstate" event (ex, back / forward
        // buttons). It will contain the ID of the earlier navigation event
        // to which the browser is returning.
        // --
        // CAUTION: This ID may not be part of the current page rendering.
        // This value is pulled out of the browser; and, may exist across
        // page refreshes.
        if ( event.restoredState ) {

          console.warn(
            "restoring navigation id:",
            event.restoredState.navigationId
          );

        }

        console.groupEnd();

      }
    )
  ;

}
   
  images: any = new Array<Object>();
  ngOnInit(): void {

    this.id=this._Activatedroute.snapshot.paramMap.get("id");
   // alert(this.id)
    this.GetDetail(this.id);
   
    

  }


  imageObject: any = new Array();
  house: any;
  GetDetail(id:any) {
    window.scroll(0,0);
   // let id = this.storage.GetData(this.storage.id);

    this.homeservice.GetHouseService(id).subscribe((response: any) => {
      this.house = response;
     
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
  reload(id:any)
  {
   
    this.GetDetail(id)
  }
 

  
  data:any;
  userSearchinput() {



    this.searchService.SearchServe(this.house.address.city).subscribe((result: any) => {

      console.log("new result " + JSON.stringify(result))

      this.data = result;

      this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))



    })



  }

}
