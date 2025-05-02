import { Component, OnInit } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { CurrencyPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { HouseDetail } from '../../interfaces/house-detail';
import { CachedData, IndexeddbService } from '../../services/indexeddb.service';
import { FormsModule } from '@angular/forms';
import { Cryptokey_Config } from '../../app.config';
import { filter } from 'rxjs';
import { Translator } from '../../Classes/translator';
@Component({
  selector: 'app-filter-view',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule,NgClass, DatePipe, CurrencyPipe],
  templateUrl: './filter-view.component.html',
  styleUrl: './filter-view.component.css'
})
export class FilterViewComponent implements OnInit {
  mydata: any;
  houseTypeName: any;
  house: any;
  housesdetails: any;
  selectedFilter: string = 'all';
  filteredHousesdetails: HouseDetail[] = [];
  likedHouses: { [key: string]: boolean } = {}; // Object to track liked status
  maxDescriptionLength = 100;

  translator:Translator = new Translator();

  isLoading:boolean = false;
  constructor(private dataService: DataService, private indexeddbService: IndexeddbService, private housedataservece: HouseDataService) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.filteredHousesdetails = [];
    this.dataService.getFilterData$.subscribe({
      next: (mes) => {
         
        this.loadHouseByTypeIdData(mes.houseTypeId)
        this.houseTypeName = mes.houseTypeName;


      }, error(err) {
        console.log(JSON.stringify(err.error))
      },
    })
  // this.dataService.clearFilterData();
   

  this.dataService.getSearchInputData$.pipe(
    filter(mes => !!mes && typeof mes === 'object' && !!mes.country)
  )
  .subscribe({
    next: async (mes) => {
      this.dataService.clearFilterData();

      if (mes.city === undefined) {
        mes.city = "undefined";
      }

      const searchdata = {
        country: mes.country,
        region: mes.region,
        city: mes.city
      };
      const encryptedData = this.indexeddbService.encrypt(
        JSON.stringify(searchdata),
        Cryptokey_Config.key
      );
      const maxIdData = await this.indexeddbService.getEncryptedData('maxId');
      const loadRequest = {
        maxId: maxIdData?.data,
        location: encryptedData,
        token:''
      };

      this.fetchHouseData(loadRequest);
      //alert("feach requestd");
    },
    error(err) {
      console.log(JSON.stringify(err.error));
    }
  });

    //this.dataService.clearSearchInputData();
    
  }

  ngOnDestroy(){
    this.filteredHousesdetails = [];
  }

  cachedDatas:any[]=[];
  loadHouseByTypeIdData(houseTypeId: any): void {
    
    this.indexeddbService.getDecriptedData('data')
    .then((data: CachedData | any) => {
      if (!data) {
        console.log('No data found in IndexedDB cache.');
        return [];
      }
  
      let filteredHouses: any[] = [];

      if(houseTypeId == 'all'){
       
        filteredHouses = data;
        console.log("filterdd House + " + filteredHouses)
        this.filteredHousesdetails = filteredHouses;
        this.isLoading = false;
        return;
      }
  
      if (Array.isArray(data)) {
        // If data is an array
        filteredHouses = data.filter(item => item.house.houseTypeId === houseTypeId);
      } else {
        // If data is a single object
        if (data.house.houseTypeId === houseTypeId) {
          filteredHouses = [data];
        }
      }
  
      if (filteredHouses.length > 0) {
        console.log('Filtered houses:', filteredHouses);
      } else {
        console.log('No houses found with the specified houseTypeId:', houseTypeId);
      }
  
      this.filteredHousesdetails = filteredHouses;
      this.isLoading = false;
      return filteredHouses;
    })
    .catch((error) => {
      console.error('Error retrieving data from IndexedDB:', error);
    });
  
  
  
  }
  navigateTo(data: any, targetRoute: string, id:string): void {
    this.dataService.setData(data);
    this.dataService.navToWithId(targetRoute, id);
  }

  _navTo(data: any, targetRoute: string) {

    this.dataService.setData(data);
    this.dataService.navTo(targetRoute);
  }


  navTo(data: any, targetRoute: string) {
    this.dataService.setData(data);
    this.dataService.navTo(targetRoute);
  }

 

 

  toggleLike(houseId: string): void {
    // Check if the user is logged in through the service
    this.housedataservece.AddUserSelectionPost(houseId).subscribe({
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


  backbutton() {
    const backButton = document.querySelector('.back-button') as HTMLButtonElement;
  
    if (backButton) {
      backButton.addEventListener('click', () => {
        console.log('Back button clicked!');
        // Navigate to the previous page
        window.history.back();
      });
    } else {
      console.error('Back button element not found.');
    }
  }
  





  private  fetchHouseData(loadRequest: { maxId: string; location: string }): void {
    
  
    this.housedataservece.fetchHouseDataByLocation(loadRequest).subscribe({
      next: async (response) => {

       this.filteredHousesdetails = response.data;
        const lowestId = Math.min(...response.data.map((item: { house: { id: number } }) => item.house.id));
        sessionStorage.setItem("lastId", lowestId.toString());
        this.isLoading = false;
        
      },
      error: (error) => {
        console.error('Error loading house data:', error);
        //this.isLoading = false;
      },
    });
  }

  
}
