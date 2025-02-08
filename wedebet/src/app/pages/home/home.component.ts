import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { HouseDetail } from '../../interfaces/house-detail';
import { DataCacheService } from '../../services/data-cache.service';
import { SlideButtonsViewComponent } from '../../pages/slide-buttons-view/slide-buttons-view.component';
import { IndexeddbService } from '../../services/indexeddb.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, CurrencyPipe, SlideButtonsViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  maxDescriptionLength = 30;
  house: any;
  contactData: any;
  filteredData: any = null;
  prompt: any = null;
  pageNumber:any;
  pageSize = 30;
  isLoading = false; // Prevent duplicate requests

  housesDetails: HouseDetail[] = []; // Initialize as empty array
  data: HouseDetail[] = [];
  _houseTypeId = "";

  houseTyeps:any[]=[];

  hasMoreData = true;
  likedHouses: { [key: string]: boolean } = {}; // Object to track liked status

  constructor(private indexeddbService: IndexeddbService,private dataService: DataService,private dataCacheService: DataCacheService,private houseDataService: HouseDataService) {
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
    
    this.loadData("data", "housesDetails");
   
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
 
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
  
      await this.delay(1000); // Wait 1 second before trying again
    }
    console.log(`Polling stopped for ${cacheKey}.`); // Log when polling stops
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
    this.isLoading = true;
    this.pageNumber = Number(sessionStorage.getItem("lastId"));
   
   
    this.houseDataService.getHousesByLocation(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
      
        if (response.success && response.data.length > 0)
          {

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

  toggleLike(houseId: string): void {
    this.houseDataService.AddUserSelectionPost(houseId).subscribe({
      next: () => {
        this.likedHouses[houseId] = !this.likedHouses[houseId];
        console.log(`House ID: ${houseId}, Liked: ${this.likedHouses[houseId]}`);
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

  filterHouses(city: string): HouseDetail[] {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    return this.housesDetails.filter(
      (house) =>
        house.address.city === city &&
        new Date(house.house.datePosted) >= threeDaysAgo
    );
  }

  getShortDescription(description: string): string {
    return description.length > this.maxDescriptionLength
      ? `${description.slice(0, this.maxDescriptionLength).trim()}...`
      : description;
  }

  navigateTo(data: any, targetRoute: string, id:string): void {
    this.dataService.setData(data);
    this.dataService.navToWithId(targetRoute, id);
  }

  


}




