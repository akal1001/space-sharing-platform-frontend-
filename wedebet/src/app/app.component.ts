
import {ApiKeyInterceptorService} from './services/api-key-interceptor.service'
import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';


import { HeaderComponent } from "./pages/header/header.component"; // Adjust path as needed
import { FooterComponent } from './pages/footer/footer.component';

import { DataService } from './DataServices/data.service';
import { VersionService } from './services/version.service';


import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HouseDataService } from './services/houseData.service';
import { DataCacheService } from './services/data-cache.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})

export class AppComponent implements OnInit {
  title = 'wedebet';
  data: any;
  version:any = "1.0.0";
  constructor( private dataservice:DataService, private datacacheSerice:DataCacheService, private housedataservice:HouseDataService, private versionSrvice:VersionService, private router:Router) { }

  
  ngOnInit() {

   
    this.router.navigate(['/main'])
    this.dataservice.getCurrentUrl$.subscribe((currenturl)=>{
      
      //this.router.navigate(['/main']);
    });
   
    this.versionSrvice.GetVersionServe().subscribe({next:(response)=>
      {
        console.log(response.success);
        console.log(response.status);
        console.log("varsion: " + response.data);

      },
      error(err) {
        console.log(err)
    },complete() {
        console.log(
          "version check complete"
        )
    },})

    this.preloadDataForType();
    this.preloadData();
   
    //this.router.navigate(['/home']);
   

  }
  reload() {
    location.reload();
  }

  pageNumber = 1;
  pageSize = 20;
  preloadData(){
    this.housedataservice.getHouses(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if (response.success && response.data.length > 0) {
          console.log("Pagination successful for page: " + this.pageNumber);
           
         localStorage.setItem("houseData", JSON.stringify(response.data));

          this.pageNumber += 1;
          this.datacacheSerice.setPageNumber(this.pageNumber);  // Store the updated page number in cache
        } else if (response.success && response.data.length === 0) {
          console.log("No more data to load.");
        } else {
          console.error("Pagination response failed.");
        }
      },
      error: (err) => {
        console.error('Error loading house data:', err);
      },
      complete: () => {
      
      },
    });
  }
  preloadDataForType(){
    this.housedataservice.AvailablehouseTypes().subscribe(
      {
        next: (response) => {

          this.data = response.data;
          localStorage.setItem("type", JSON.stringify(this.data));

        }, error(err) {

        }, complete() {

        },
      })
  }
}


