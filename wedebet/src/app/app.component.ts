
import { ApiKeyInterceptorService } from './services/api-key-interceptor.service'
import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';


import { HeaderComponent } from "./pages/header/header.component"; // Adjust path as needed
import { FooterComponent } from './pages/footer/footer.component';

import { DataService } from './DataServices/data.service';
import { VersionService } from './services/version.service';


import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HouseDataService } from './services/houseData.service';
import { DataCacheService } from './services/data-cache.service';
import { IndexeddbService } from './services/indexeddb.service';
import { firstValueFrom } from 'rxjs';




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
  version: any = "1.0.0";
  pageNumber = 1;
  pageSize = 50;
  constructor(private dataService:DataService, private router:Router, private indexedDbService: IndexeddbService, private housedataservice: HouseDataService) {
   
   }


  ngOnInit() {
    // this.indexedDbService.deleteCacheData("api/data").then(() => {
    //   console.log("Cache data deleted successfully.");
    // }).catch((error) => {
    //   console.error("Error deleting cache data:", error);
    // });
    
    // this.indexedDbService.deleteCacheData("api/type").then(() => {
    //   console.log("Cache data deleted successfully.");
    // }).catch((error) => {
    //   console.error("Error deleting cache data:", error);
    // });

    // this.indexedDbService.deleteCacheData("api/top3").then(() => {
    //   console.log("Cache data deleted successfully.");
    // }).catch((error) => {
    //   console.error("Error deleting cache data:", error);
    // });

   
    
   
    this.router.navigate(['/main'])
    //this.router.navigate(['/home']);


  }



 
}

