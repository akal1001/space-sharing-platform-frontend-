import { Component } from '@angular/core';
import { HouseDataService } from '../../services/houseData.service';
import { NgFor,NgIf, DatePipe } from '@angular/common';

import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { DataService } from '../../DataServices/data.service';
import { AdminService } from '../../services/admin.service';
import { IndexeddbService } from '../../services/indexeddb.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, NgFor,NgIf, DatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  housetype: string = '';
  inputValue:any;
  appVerison:any;
  constructor(private housedataservice:HouseDataService, private addminService:AdminService, private indexeddbService: IndexeddbService,private dataService: DataService, private router: Router, private accountService: AccountService, private housedataSrvice: HouseDataService){
     this.addminService.getversion().subscribe({next:(response)=>{
      this.appVerison = response.data;
     },error:(error)=>{
        console.log(error.error);
     }})

     this.GeGEOLoc();
  }
  onSubmitType() {
    this.housedataservice.InserHouseTypes(this.housetype).subscribe({next:(response)=>
     {
     console.log(response);
    },error(err) {
      console.log(err)
    },});
    
   }

   onSubmitVersion() {
    this.addminService.addVersionServe(this.inputValue).subscribe({next:(response)=>
     {
     console.log(response);
     
    },error(err) {
      console.log(err)
    },});
    
   }

   geoLoc:any;

   GeGEOLoc(){
    this.addminService.getGeoLocation().subscribe({next:(response)=>{
      this.geoLoc = response;
      console.log(this.geoLoc);
    },error(err) {
      
    },})
   }



   ipLocations = [
    { ip: '196.188.0.0', country: 'Ethiopia' },
    { ip: '196.188.0.0', country: 'Ethiopia' },
    { ip: '8.8.8.8', country: 'USA' }, // Google's public DNS server
    { ip: '203.0.113.5', country: 'Japan' },
    { ip: '185.86.151.11', country: 'Germany' }
  ];


   
  selectedLocation: any;

  changeLocation(event: any): void {
    this.selectedLocation = event.target.value;
    console.log('Selected IP Location:', this.selectedLocation);
    this.indexeddbService.deleteCacheData("data")
    this.indexeddbService.deleteCacheData("Type")

    this.accountService.ChangeUserLocation(this.selectedLocation).subscribe({
      next: (response) => {
        console.log('Response:', response.success);
       
        if(response.success == false){
          this.indexeddbService.saveDataAndEncrypted("location", response.location);
         
        }
        if(response.success){
         
          const types =  this.CreateHouseTypes(response.data);
        

          console.log("house type after location changed: " + JSON.stringify(types));

          //this.indexeddbService.saveDataAndEncrypted("type", types);
          this.indexeddbService.saveDataAndEncrypted("location", response.location);
          this.indexeddbService.saveDataAndEncrypted("data", response.data);
          this.indexeddbService.saveDataAndEncrypted("Type", types);
        }
      },
      error: (err) => {
        console.error('Error:', err);
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



   



   
}
