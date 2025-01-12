import { Component, OnInit } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { HouseDetail } from '../../interfaces/house-detail';
import { CachedData, IndexeddbService } from '../../services/indexeddb.service';
@Component({
  selector: 'app-filter-view',
  standalone: true,
  imports: [NgFor, NgIf,  DatePipe, CurrencyPipe],
  templateUrl: './filter-view.component.html',
  styleUrl: './filter-view.component.css'
})
export class FilterViewComponent implements OnInit {
  mydata: any;
  houseTypeName:any;
  house: any;
  housesdetails: any;
  constructor(private dataService: DataService, private indexeddbService: IndexeddbService, private housedataservece:HouseDataService) {


  }
  ngOnInit(): void {

    this.dataService.getFilterData$.subscribe({
      next: (mes) => {
        this.loadHouseByTypeIdData(mes.houseTypeId)
        this.houseTypeName = mes.houseTypeName;
      }, error(err) {
        console.log(JSON.stringify(err.error))

      },
    })
  }



  filterdHousesdetails: HouseDetail[] = [];

  loadHouseByTypeIdData(houseTypeId: any): void {
    this.indexeddbService.getData('api/data')
      .then((data: CachedData | undefined) => {

        const  cachedDatas = data?.data;
        this.filterdHousesdetails = cachedDatas.filter((d: { house: { houseTypeId: any; }; }) => d.house.houseTypeId === houseTypeId);
        
        if (data?.data.length > 0) 
        {
          console.log("new data " + JSON.stringify(this.filterdHousesdetails))
          // Filter the data based on houseTypeId
        
  
          
          // Log or use the filtered data as needed
          if (this.filterdHousesdetails.length > 0) {
            console.log('Filtered houses:', this.filterdHousesdetails);
          } else {
            console.log('No houses found with the specified houseTypeId:', houseTypeId);
          }
        } else {
          console.log('No data found in IndexedDB cache.');
        }
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

  maxDescriptionLength = 300;

  getShortDescription(description: string): string {
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength).trim() + '...';
    }
    return description;
  }


  
  likedHouses: { [key: string]: boolean } = {}; // Object to track liked status

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
}
