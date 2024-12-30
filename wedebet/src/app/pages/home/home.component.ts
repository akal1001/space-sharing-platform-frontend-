import { Component, HostListener, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { DetailComponent } from '../detail/detail.component'
import { DataService } from '../../DataServices/data.service';
import { Router, RouterOutlet } from '@angular/router';
import { House } from '../../interfaces/house';
import { NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { Route } from '@angular/router';
import { VersionService } from '../../services/version.service';
import { FilterViewComponent } from '../filter-view/filter-view.component';
import { HouseDetail } from '../../interfaces/house-detail';
import { count, from } from 'rxjs';
import { DataCacheService } from '../../services/data-cache.service';
import { AccountService } from '../../services/account.service';
import { SlideButtonsViewComponent} from '../../pages/slide-buttons-view/slide-buttons-view.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideMenuComponent, NgFor, NgIf, DatePipe, CurrencyPipe,FilterViewComponent,SlideButtonsViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  maxDescriptionLength = 30;
  house: any;
  contactData: any;
  filteredData: any = null;

  pageNumber = 1;
  pageSize = 10;
  isLoading = false; // Prevent duplicate requests
  

  housesdetails: HouseDetail[] = [];  // Initialize as empty array
  data: HouseDetail[] = [];

  _houseTypeId:string="";


  constructor(private dataService: DataService, private accountService: AccountService, private dataCacheService: DataCacheService, private versionservice: VersionService, private housedataservice: HouseDataService, private router: Router) {

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
    // Check if there is a cached page number
    const cachedPageNumber = this.dataCacheService.getPageNumber();
    if (cachedPageNumber !== null) {
      this.pageNumber = cachedPageNumber;  // Use cached page number
    }

    // Check if there is cached data available
    const cachedData = this.dataCacheService.getCache();
    if (cachedData) {
      this.housesdetails = cachedData;  // Use cached data
      this.data = cachedData;
    } else {
      this.loadHouseData();  // Load fresh data if no cache exists
    }

    this.CheckVersion();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      if(this._houseTypeId != ""){
        this.loadHouseByTypeIdData(this._houseTypeId);
      }
      else{
        this.loadHouseData();
      }
      
    }
  }

  loadHouseData(): void {
    this.isLoading = true; // Prevent additional requests while loading
    this.housedataservice.getHouses(this.pageNumber, this.pageSize).subscribe({
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

  loadHouseByTypeIdData(houseTypeId:any): void {
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

    this.accountService.ReturnUserDataFromLocalStorage().subscribe({
      next: (response) => {

        if (!response?.success) {
          alert("Please log in to access this feature.");
          return;
        }
        this.housedataservice.AddUserSelectionPost(houseId,response.token).subscribe({next(value) 
        {
          
        },
         error(err) {
         
       },})
        this.likedHouses[houseId] = !this.likedHouses[houseId];
        this.likedHouses[houseId]
      }, error(err) {

      },
    })

    // Toggle the liked state for the specific house

    //alert(`House ID: ${houseId}, Liked: ${this.likedHouses[houseId]}`);
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


