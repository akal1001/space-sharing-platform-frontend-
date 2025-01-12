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
  house: any[] = [];
  constructor(private indexeddbService: IndexeddbService, private router: Router, private dataService: DataService, private accountService: AccountService, private housedataSrvice: HouseDataService) {

  }
  ngOnInit(): void {
    this.GeTop3Post();
  }

  onDeleteFav(id: any) {


  }

  private GeTop3Post() {
    this.indexeddbService.getData('api/top3').then((data) => {
      if (data) {
        console.log('IndexedDB cached data:', data.data);
        this.houseData = data.data;
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


