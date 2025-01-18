import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { HouseDataService } from '../../services/houseData.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
import { IndexeddbService } from '../../services/indexeddb.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  houseData: any;
  isLoading:boolean = true;
  house: any[] = [];
  constructor(private indexeddbService: IndexeddbService, private router: Router, private dataService: DataService, private accountService: AccountService, private housedataSrvice: HouseDataService) {

  }
  ngOnInit(): void {
    this.dataService.getCacheReadyStatus().subscribe((isReady) => {
    
      if (isReady) {
        this.GeTop3Post();
      }
    });
  }

  onDeleteFav(id: any) {
  }

  location = {"country":"", "region":"", "city":""};
  private GeTop3Post() {
    this.indexeddbService.getData('api/top3').then((data) => {
      if (data) {
      
        this.houseData = data.data;
      } else {
        console.log('No data found in IndexedDB cache.');
      }
    }).catch((error) => {
      console.error('Error retrieving data from IndexedDB:', error);
    });


    // //for locations 
    this.indexeddbService.getData('api/location').then((data) => {
      if (data) {
       
       this.location.country = data.data.country;
       this.location.region = data.data.region;
       this.location.city = data.data.city;
       this.isLoading = false;
       
      } else {
        console.log('No data found in IndexedDB cache.');
      }
    }).catch((error) => {
      console.error('Error retrieving data from IndexedDB:', error);
    });

  }

  _navTo(data: any, targetRoute: string) {

    this.dataService.setData(data);
    this.dataService.navTo(targetRoute);
  }


  

}


