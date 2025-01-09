import { Component, HostListener, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { DetailComponent } from '../detail/detail.component'
import { DataService } from '../../DataServices/data.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { House } from '../../interfaces/house';
import { NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { Route } from '@angular/router';
import { VersionService } from '../../services/version.service';
import { FilterViewComponent } from '../filter-view/filter-view.component';
import { HouseDetail } from '../../interfaces/house-detail';
import { count, from, Observable } from 'rxjs';
import { DataCacheService } from '../../services/data-cache.service';
import { AccountService } from '../../services/account.service';
import { SlideButtonsViewComponent} from '../../pages/slide-buttons-view/slide-buttons-view.component';
import { NavigationService } from '../../services/navigation.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideMenuComponent,NgIf, NgFor, DatePipe, CurrencyPipe, SlideButtonsViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  maxDescriptionLength = 30;
  house: any;
  contactData: any;
  filteredData: any = null;

  pageNumber = 2;
  pageSize = 20;
  isLoading = false; // Prevent duplicate requests
  

  housesdetails: HouseDetail[] = [];  // Initialize as empty array
  data: HouseDetail[] = [];

  _houseTypeId:string="";


  constructor(private navigationService: NavigationService,private dataService: DataService, private accountService: AccountService, private dataCacheService: DataCacheService, private versionservice: VersionService, private housedataservice: HouseDataService, private router: Router) {
  
    this.dataService.getFilterData$.subscribe({
      next: (value) => {
        this.filteredData = value;
        this.pageNumber = 1
        this.housesdetails = [];  // Use cached data
        this.data = [];
        console.log("data comes from slide buttons " + this.filteredData.houseTypeId)
        this._houseTypeId = this.filteredData.houseTypeId;
        this.loadHouseByTypeIdData(this._houseTypeId);
       
      }, error: (eror) => {
        console.log(eror.error);

      }
    })
  }


  ngOnInit(): void {
 
    this._houseTypeId = "";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const hd = localStorage.getItem("houseData")
    // Check if there is cached data available
    if(hd !== null){
      
      const cachedData = JSON.parse(hd);
      this.housesdetails = cachedData;
    }
    else {
      
      this.loadHouseData();  //
    //const cachedData = this.dataCacheService.getCache();
    // if (cachedData) {
    //   this.housesdetails = cachedData;  // Use cached data
    //   this.data = cachedData;
    // }  Load fresh data if no cache exists
    }

    //this.CheckVersion();
  }

  // @HostListener('window:scroll', [])
  // onScroll(): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
  //     if(this._houseTypeId != "")
  //     {
  //       this.loadHouseByTypeIdData(this._houseTypeId);
  //     }
  //     else{
  //       localStorage.removeItem("houseData");
  //       this.loadHouseData();
  //     }
      
  //   }
  // }

  hasMoreData: boolean = true;
  @HostListener('window:scroll', [])
  debounceScroll = this.debounce(async () => {
  const offset = 200;
  const scrollPosition = window.innerHeight + window.scrollY;
  const triggerPoint = document.body.offsetHeight / 2;

  if (scrollPosition >= triggerPoint && !this.isLoading && this.hasMoreData) {
    this.isLoading = true;
    console.log("event fired");
    try {
       if(this._houseTypeId===""){
        return await this.loadHouseData();
       }
      
       this.loadHouseByTypeIdData(this._houseTypeId);
   
    } catch (error) {
      console.error('Error during scroll data load:', error);
    } finally {
      this.isLoading = false;
    }
  }
}, 200);

debounce(func: Function, delay: number) {
  let timer: any;
  return  (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}



  


  loadHouseData(): void {
   
    this.isLoading = true; // Prevent additional requests while loading
    this.housedataservice.getHouses(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if (response.success && response.data.length > 0) {
          console.log("Pagination successful for page: " + this.pageNumber);
          this.housesdetails.push(...response.data);
          const d = response.data;
           
         localStorage.setItem("houseData", JSON.stringify(d));

          this.pageNumber += 1;
          this.dataCacheService.setPageNumber(this.pageNumber);  // Store the updated page number in cache
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
        this.isLoading = false; // Allow new requests after completion
      },
    });
  }

  loadHouseByTypeIdData(houseTypeId:any) {
    this.isLoading = true; // Prevent additional requests while loading
    this.housedataservice.getHousesByHouseTypeId(this.pageNumber, this.pageSize,houseTypeId).subscribe({
      next: (response) => {
        if (response.success && response.data.length > 0) {
          console.log("Pagination successful for page: " + this.pageNumber);
          this.housesdetails.push(...response.data);
          this.dataCacheService.setCache(this.housesdetails); // Store data in cache
          this.pageNumber += 1;
          this.dataCacheService.setPageNumber(this.pageNumber);  // Store the updated page number in cache
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
        this.isLoading = false; // Allow new requests after completion
      },
    });
  }



  _navTo(data: any, targetRoute: string) {

    this.dataService.setData(data);
    this.dataService.navTo(targetRoute);
  }



  getShortDescription(description: string): string {
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength).trim() + '...';
    }
    return description;
  }

  CheckVersion() {
    // Set initial version in localStorage (if not already set)
    const storedVersion = localStorage.getItem("_v") || "1.1.0";
    localStorage.setItem("_v", storedVersion);

    this.versionservice.GetVersionServe().subscribe({
      next: (response) => {
        console.log(response.success);
        console.log(response.status);
        console.log("Version from Server: " + response.data);

        if (response.success) {
          console.log("Stored Version: " + storedVersion);
          console.log("Version from Server: " + response.data);

          // Check if the versions differ
          if (storedVersion !== response.data) {
            // Update the stored version
            localStorage.setItem("_v", response.data);


            // Reload the page
            location.reload();
          }
        }
      },
      error: (err) => {
        console.error("Error fetching version:", err);
      },
      complete: () => {
        console.log("Version check complete");
      },
    });
  }








  likedHouses: { [key: string]: boolean } = {}; // Object to track liked status

  toggleLike(houseId: string): void {
    // Check if the user is logged in through the service
    this.housedataservice.AddUserSelectionPost(houseId).subscribe({
      next: () => {
        // Toggle the liked state for the specific house
        this.likedHouses[houseId] = !this.likedHouses[houseId];
        console.log(`House ID: ${houseId}, Liked: ${this.likedHouses[houseId]}`);
      },
      error: (err) => {
        if (err.status === 401) {
          alert("Please log in to access this feature.");
        } else {
          console.error('Error while liking the house:', err);
        }
      },
    });
  }
  


  isCount1() {


    const lastFetchedTimestamp = sessionStorage.getItem('lastFetchedTimestamp');

    this.housedataservice.getNewPostHouseCount(lastFetchedTimestamp).subscribe((data) => {



      if (data.data > 0) {
        this.dataService.setNewPostCountData(data.data);
        //this.pageNumber = 1;
        // this.data = [];
        // this.dataCacheService.clearCache();
      }
      console.log("data cont : " + data.data)

    })
  }
}


