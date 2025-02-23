
import { ApiKeyInterceptorService } from './services/api-key-interceptor.service'
import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
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
import { NavigationService } from './services/navigation.service';




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
  constructor(private router:Router, private navService:NavigationService) {
   
   }


   ngOnInit() {
  
    // const currentUrl = this.router.url;
    // console.log(currentUrl)

  
  

  // var url = this.navService.getCurrentUrl();
  
  // alert(url);
   
   this.router.navigate(['/main']);
    //this.router.navigate(['/home']);


  }



 
}
