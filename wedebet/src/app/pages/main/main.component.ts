import { Component, OnInit } from '@angular/core';
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
export class MainComponent implements OnInit  {
  prompt: string | null = null;
  data: any;
  pageNumber = 1;
  pageSize = 1;
  top3houseData: any;
  isLoading = true;
  decryptedData: any; // Variable to store decrypted data
  
  errorMessage: string = '';
  house: any[] = [];
  location = { country: "", region: "", city: "" };
  constructor(
    private indexedDbService: IndexeddbService,
    private dataService: DataService,
    private houseDataService: HouseDataService
  ) {}
  
  ngOnInit(): void {
    
    this.isLoading = true; 
    this.loadTop3DecryptedDataFromIndexDb('top3'); 
    this.initializeLocationData(); 
  }
  
  private initializeLocationData(): void {
   
    this.houseDataService.fetchLocationWithMaxId().subscribe({
      next: (response) => {
        if (response.success) {
          this.location = response.location;
  
          // Save location and maxId to IndexedDB
          this.indexedDbService.saveDataAndEncrypted('location', response.location);
          this.indexedDbService.saveDataAndEncrypted('maxId', response.data);
          localStorage.setItem("maxId", response.data);
  
          this.loadInitialHouseData();
        }
      },
      error: (err) => {
        console.error('Error fetching location data:', err.error);
      },
    });
  }
  
  private async loadInitialHouseData(): Promise<void> {
    try {
      const locationData = await this.indexedDbService.getEncryptedData('location');
      const maxIdData = await this.indexedDbService.getEncryptedData('maxId');
  
      if (!locationData || !maxIdData) {
        console.error('Missing data for house data initialization:', { locationData, maxIdData });
        return;
      }
  
      const loadRequest = { maxId: maxIdData.data, location: locationData.data };
      this.fetchHouseData(loadRequest);
    } catch (error) {
      console.error('Error during house data initialization:', error);
    }
  }
  
  private  fetchHouseData(loadRequest: { maxId: string; location: string }): void {
    //this.isLoading = true;
  
    this.houseDataService.fetchHouseDataByLocation(loadRequest).subscribe({
      next: async (response) => {

       
      
        const top3Houses = response.data.slice(0, 3);
        this.top3houseData = top3Houses;
       
        this.isLoading = false;

        console.log("Top 3 recent house " + top3Houses);

        const lowestId = Math.min(...response.data.map((item: { house: { id: number } }) => item.house.id));
        sessionStorage.setItem("lastId", lowestId.toString());

        await this.indexedDbService.saveDataAndEncrypted("data", response.data);
      
        await this.indexedDbService.saveDataAndEncrypted("top3", top3Houses);

      

        
      },
      error: (error) => {
        console.error('Error loading house data:', error);
        this.isLoading = false;
      },
    });
  }
 
  private CreateHouseTypes(response: any): any {
    // Ensure response.data is an array and contains valid items
    if (!response?.data || !Array.isArray(response.data)) {
      console.error('Invalid response data:', response);
      return []; // Return an empty array if data is invalid
    }
  
    // Create a Map to ensure uniqueness based on houseTypeId
    return Array.from(
      new Map(
        response.data.map((item: { house: { houseTypeId: any; header: any } }) => [
          item.house.houseTypeId, // Use houseTypeId as the key
          { houseTypeId: item.house.houseTypeId, header: item.house.header }, // Store houseTypeId and header in the value
        ])
      ).values()
    );
  }
 
  async loadTop3DecryptedDataFromIndexDb(cacheId: string): Promise<void> {
   // Start loading
    try {
      const data = await this.indexedDbService.getDecriptedData(cacheId); // Call the getDecriptedData method
      if (data) {
        this.decryptedData = data; // Assign the decrypted data to the component property
        this.top3houseData = this.decryptedData;
        this.isLoading = false;
      } else {
        this.isLoading = true;
        this.errorMessage = 'No data found or decryption failed'; // Handle case where data is undefined
      }
    } catch (error) {
      this.errorMessage = 'Error loading decrypted data'; // Handle any errors that occurred
      console.error(error);
    } finally {
      
    }
  
  }

 _navTo(data: any, targetRoute: string): void {

   this.dataService.setData(data);
   this.dataService.navTo(targetRoute);
 }
}

