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
import { SlideButtonsViewComponent } from '../../pages/slide-buttons-view/slide-buttons-view.component';
import { NavigationService } from '../../services/navigation.service';
import { IndexeddbService } from '../../services/indexeddb.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideMenuComponent, NgIf, NgFor, DatePipe, CurrencyPipe, SlideButtonsViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  maxDescriptionLength = 30;
  house: any;
  contactData: any;
  filteredData: any = null;

  pageNumber = 1;
  pageSize = 100;
  isLoading = false; // Prevent duplicate requests


  housesdetails: HouseDetail[] = [];  // Initialize as empty array
  data: HouseDetail[] = [];

  _houseTypeId: string = "";


  constructor(private indexeddbService: IndexeddbService, private navigationService: NavigationService, private dataService: DataService, private accountService: AccountService, private dataCacheService: DataCacheService, private versionservice: VersionService, private housedataservice: HouseDataService, private router: Router) {

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

  hd: any;
  ngOnInit(): void {


    this.indexeddbService.getData('api/data').then((data) => {
      if (data) {
        console.log('IndexedDB cached data:', data.data);
        this.housesdetails = data.data;
      } else {
        console.log('No data found in IndexedDB cache.');
      }
    }).catch((error) => {
      console.error('Error retrieving data from IndexedDB:', error);
    });



    this._houseTypeId = "";
    window.scrollTo({ top: 0, behavior: 'smooth' });


    // alert(hd);


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
      return this.loadHouseData();

    }
  }, 200);

  debounce(func: Function, delay: number) {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }


 





  loadHouseData(): void {
    const cacheKey = 'api/data';
    this.isLoading = true; // Prevent additional requests while loading
    this.housedataservice.getHouses(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        if (response.success && response.data.length > 0) {
          console.log("Pagination successful for page: " + this.pageNumber);

          this.indexeddbService.saveData(cacheKey, response.data);
          for(var i = 0; i < response.data.length; i ++)
          {
            this.housesdetails.push(response.data[i]);
          }
         

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
  fd: any;
  filterdHousesdetails: HouseDetail[] = [];
  loadHouseByTypeIdData(houseTypeId: any) {


    this.indexeddbService.getData('api/data').then((data) => {
      if (data) {
          
        this.housesdetails = data.data;

        const filteredHouses = this.housesdetails.filter(house => house.house.houseTypeId === houseTypeId);
        console.log("filtered data  new: + " + filteredHouses);
        for (var i = 0; i < this.filterdHousesdetails.length; i++) {
         // this.housesdetails.unshift(filteredHouses[i]);
           console.log("is data filtered " + filteredHouses[houseTypeId]);
          this.housesdetails = filteredHouses;


        }

      } else {
        console.log('No data found in IndexedDB cache.');
      }
    }).catch((error) => {
      console.error('Error retrieving data from IndexedDB:', error);
    });
  




    // this.isLoading = true; // Prevent additional requests while loading
    // this.housedataservice.getHousesByHouseTypeId(this.pageNumber, this.pageSize,houseTypeId).subscribe({
    //   next: (response) => {
    //     if (response.success && response.data.length > 0) {
    //       console.log("Pagination successful for page: " + this.pageNumber);
    //       this.housesdetails.push(...response.data);
    //       this.dataCacheService.setCache(this.housesdetails); // Store data in cache
    //       this.pageNumber += 1;
    //       this.dataCacheService.setPageNumber(this.pageNumber);  // Store the updated page number in cache
    //     } else if (response.success && response.data.length === 0) {
    //       console.log("No more data to load.");
    //     } else {
    //       console.error("Pagination response failed.");
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error loading house data:', err);
    //   },
    //   complete: () => {
    //     this.isLoading = false; // Allow new requests after completion
    //   },
    // });
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


