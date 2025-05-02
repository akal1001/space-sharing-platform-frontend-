import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { NgIf, DatePipe, CurrencyPipe, NgClass } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { HouseDetail } from '../../interfaces/house-detail';
import { DataCacheService } from '../../services/data-cache.service';
import { SlideButtonsViewComponent } from '../../pages/slide-buttons-view/slide-buttons-view.component';
import { IndexeddbService } from '../../services/indexeddb.service';
import { Translator } from '../../Classes/translator';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, DatePipe, CurrencyPipe, SlideButtonsViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  maxDescriptionLength = 240;
  house: any;
  contactData: any;
  filteredData: any = null;
  prompt: any = null;
  pageNumber: any;
  pageSize = 30;
  isLoading = false; // Prevent duplicate requests

  housesDetails: HouseDetail[] = []; // Initialize as empty array
  data: HouseDetail[] = [];
  _houseTypeId = "";

  houseTyeps: any[] = [];

  hasMoreData = true;



  translator: Translator = new Translator();

  constructor(private indexeddbService: IndexeddbService, private dataService: DataService, private dataCacheService: DataCacheService, private houseDataService: HouseDataService) {
    this.dataService.getFilterData$.subscribe({
      next: (value) => {
        this.filteredData = value;
        this.pageNumber = this.pageNumber = Number(sessionStorage.getItem("lastId"));
        this.housesDetails = [];
        this.data = [];
        this._houseTypeId = this.filteredData.houseTypeId;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit(): void {

    this.translator = new Translator();
    this.loadData("data", "housesDetails");
    window.scrollTo({ top: 0, behavior: "smooth" });

  }


 






 
  likedHouses: { [houseId: string]: boolean } = {};
  private async loadData(cacheKey: string, property: string): Promise<void> {
    console.log(`Polling started for ${cacheKey}...`);

  


    while (true) {
      try {

        const data = await this.indexeddbService.getDecriptedData(cacheKey);

        if (Array.isArray(data) && data.length > 0) {
          if (property === "housesDetails") {
            this.housesDetails = data;

          }
          break;
        }
      } catch (error) {
        console.error(`Error retrieving data for ${cacheKey}:`, error);
      }

      await this.delay(1000);
    }
    console.log(`Polling stopped for ${cacheKey}.`);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  @HostListener("window:scroll", [])
  debounceScroll = this.debounce(async () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const triggerPoint = document.body.offsetHeight / 2;

    if (scrollPosition >= triggerPoint && !this.isLoading && this.hasMoreData) {
      this.loadHouseData();
    }
  }, 200);

  debounce(func: Function, delay: number): Function {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  loadHouseData(): void {
    const cacheKey = "data";
   
    this.pageNumber = Number(sessionStorage.getItem("lastId"));

    let userToken='';
    var _token = localStorage.getItem('v');
    if(_token){
      userToken = JSON.parse(_token).token;
    }

    this.houseDataService.getHousesByLocation(this.pageNumber, this.pageSize, userToken).subscribe({
      next: (response) => {


        if (response.success && response.data.length > 0) {

          const lowestId = Math.min(...response.data.map((item: { house: { id: any; }; }) => item.house.id));
          sessionStorage.setItem("lastId", lowestId.toString())

          this.housesDetails.push(...response.data);

          this.indexeddbService.saveDataAndEncrypted(cacheKey, this.housesDetails);



          this.dataCacheService.setPageNumber(this.pageNumber);
        } else if (response.success && response.data.length === 0) {
          console.log("No more data to load.");
          this.hasMoreData = false;
        } else {
          console.error("Pagination response failed.");
        }
      },
      error: (err) => {
        console.error("Error loading house data:", err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  
  userSavedhouseIds: string[] = []; // should be fetched from backend or service
  toggleLike(houseId: string): void {
    this.houseDataService.AddUserSelectionPost(houseId).subscribe({
      next: () => {
        // Update local state after successful request
        const house = this.housesDetails.find(h => h.house.houseId === houseId);
        if (house) {
          house.isLiked = !house.isLiked;
        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert("Please log in to access this feature.");
        } else {
          console.error("Error while liking the house:", err);
        }
      },
    });
  }
  
  // toggleLike(houseId: string) {
  //   const index = this.userSavedhouseIds.indexOf(houseId);
  //   if (index > -1) {
  //     this.userSavedhouseIds.splice(index, 1);
  //   } else {
  //     this.userSavedhouseIds.push(houseId);
  //   }

  //   // Save to backend or localStorage if needed
  // }

  filterHouses(city: string): HouseDetail[] {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    return this.housesDetails.filter(
      (house) =>
        house.address.city === city &&
        new Date(house.house.datePosted) >= threeDaysAgo
    );
  }



  navigateTo(data: any, targetRoute: string, id: string): void {
    this.dataService.setData(data);
    this.dataService.navToWithId(targetRoute, id);
  }




}




