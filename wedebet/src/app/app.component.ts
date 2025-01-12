
import { ApiKeyInterceptorService } from './services/api-key-interceptor.service'
import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';


import { HeaderComponent } from "./pages/header/header.component"; // Adjust path as needed
import { FooterComponent } from './pages/footer/footer.component';

import { DataService } from './DataServices/data.service';
import { VersionService } from './services/version.service';


import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HouseDataService } from './services/houseData.service';
import { DataCacheService } from './services/data-cache.service';
import { IndexeddbService } from './services/indexeddb.service';
import { firstValueFrom } from 'rxjs';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})

export class AppComponent implements OnInit {
  title = 'wedebet';
  data: any;
  version: any = "1.0.0";
  pageNumber = 1;
  pageSize = 100;
  constructor(private indexedDbService: IndexeddbService, private housedataservice: HouseDataService) { }


  ngOnInit() {

    this.populateIndexedDB_Types();
    this.populateIndexedDB_Top3();
    this.populateIndexedDB_Houses();

    //this.router.navigate(['/main'])
    //this.router.navigate(['/home']);


  }

  async populateIndexedDB_Top3() {

    const cacheKey = 'api/top3';
    // Check if data exists in IndexedDB
    const cachedData = await this.indexedDbService.getData(cacheKey);

    if (cachedData) {
      console.log('Using cached data:', cachedData);
      this.data = cachedData;
      return;
    }

    // Fetch data from API and save it to IndexedDB
    try {
      const response = await firstValueFrom(this.housedataservice.GetTop3HousePost());
      if (response.success && response.data.length > 0) {
        await this.indexedDbService.saveData(cacheKey, response.data);
      } else if (response.success) {
        console.log('No more data to load.');
      } else {
        console.error('Failed to fetch data from API.');
      }
    } catch (error) {
      console.error('Error loading house data:', error);
    }
  }

  async populateIndexedDB_Types() {

    const cacheKey = 'api/types';

    // Check if data exists in IndexedDB
    const cachedData = await this.indexedDbService.getData(cacheKey);

    if (cachedData) {
      console.log('Using cached data:', cachedData);
      this.data = cachedData;
      return;
    }

    // Fetch data from API and save it to IndexedDB
    try {
      const response = await firstValueFrom(this.housedataservice.AvailablehouseTypes());
      if (response.success && response.data.length > 0) {
        await this.indexedDbService.saveData(cacheKey, response.data);
      } else if (response.success) {
        console.log('No more data to load.');
      } else {
        console.error('Failed to fetch data from API.');
      }
    } catch (error) {
      console.error('Error loading house data:', error);
    }
  }

  async populateIndexedDB_Houses() {
    const cacheKey = 'api/data';

    // Check if data exists in IndexedDB
    const cachedData = await this.indexedDbService.getData(cacheKey);

    if (cachedData) {
      console.log('Using cached data:', cachedData);
      this.data = cachedData;
      return;
    }

    // Fetch data from API and save it to IndexedDB
    try {
      const response = await firstValueFrom(this.housedataservice.getHouses(this.pageNumber, this.pageSize));
      if (response.success && response.data.length > 0) {
        console.log(`Data fetched successfully for page ${this.pageNumber}`);

        await this.indexedDbService.saveData(cacheKey, response.data);

        this.pageNumber++;
      } else if (response.success) {
        console.log('No more data to load.');
      } else {
        console.error('Failed to fetch data from API.');
      }
    } catch (error) {
      console.error('Error loading house data:', error);
    }
  }
}

