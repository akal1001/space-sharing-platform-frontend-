import { Component, OnInit } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { HouseDetail } from '../../interfaces/house-detail';
import { CachedData, IndexeddbService } from '../../services/indexeddb.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filter-view',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, DatePipe, CurrencyPipe],
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

  constructor(private dataService: DataService, private indexeddbService: IndexeddbService, private housedataservece: HouseDataService) {}
  ngOnInit(): void {

    this.dataService.getFilterData$.subscribe({
      next: (mes) => {
       
        this.loadHouseByTypeIdData(mes.houseTypeId)
        this.houseTypeName = mes.houseTypeName;
      }, error(err) {
        console.log(JSON.stringify(err.error))
      },
    })
    this.attachDropdownListener();
    this.backbutton();
  }

  attachDropdownListener() {

    const dropdown = document.querySelector('.filter-dropdown') as HTMLSelectElement;
    if (dropdown) {
      dropdown.addEventListener('change', (event: Event) => {
        const selectedValue = (event.target as HTMLSelectElement).value;
        console.log('Selected value:', selectedValue);
      });
    } else {
      console.error('Dropdown element not found.');
    }

  }

  GetSelectedValue(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    // Perform sorting based on the selected value
    if (selectedValue === 'priceLowToHigh') {
      this.filteredHousesdetails.sort((a, b) => a.house.price - b.house.price);
    } else if (selectedValue === 'priceHighToLow') {
      this.filteredHousesdetails.sort((a, b) => b.house.price - a.house.price);
    }
    else if (selectedValue === 'all') {

      this.resetToDefaultOrder();
    }

    console.log('Sorted houses:', this.filteredHousesdetails);
  }

  resetToDefaultOrder() {
    this.dataService.getFilterData$.subscribe({
      next: (mes) => {
        this.loadHouseByTypeIdData(mes.houseTypeId)
        this.houseTypeName = mes.houseTypeName;
      }, error(err) {
        console.log(JSON.stringify(err.error))

      },
    })
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
      return filteredHouses;
    })
    .catch((error) => {
      console.error('Error retrieving data from IndexedDB:', error);
    });
  
  
  
  }


  _navTo(data: any, targetRoute: string) {

    this.dataService.setData(data);
    this.dataService.navTo(targetRoute);
  }


  navTo(data: any, targetRoute: string) {
    this.dataService.setData(data);
    this.dataService.navTo(targetRoute);
  }

 

  getShortDescription(description: string): string {
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength).trim() + '...';
    }
    return description;
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
  
}
