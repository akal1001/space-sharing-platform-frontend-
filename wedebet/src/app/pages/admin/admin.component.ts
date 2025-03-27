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



  //  ipLocations = [
  //   { ip: '196.188.0.0', country: 'Ethiopia' },
  //   { ip: '196.188.0.0', country: 'Ethiopia' },
  //   { ip: '8.8.8.8', country: 'USA' }, // Google's public DNS server
  //   { ip: '203.0.113.5', country: 'Japan' },
  //   { ip: '185.86.151.11', country: 'Germany' }
  // ];
  ipLocations = [
    { ip: '196.188.0.0', country: 'Ethiopia' },
    { ip: '196.188.0.0', country: 'Ethiopia' },
    { ip: '8.8.8.8', country: 'USA' }, // Google's public DNS server
    { ip: '203.0.113.5', country: 'Japan' },
    { ip: '185.86.151.11', country: 'Germany' },
    { ip: '8.8.8.8', country: 'California' },
    { ip: '23.34.45.67', country: 'Texas' },
    { ip: '45.56.78.89', country: 'New York' },
    { ip: '52.12.34.56', country: 'Oregon' },
    { ip: '66.96.120.1', country: 'Florida' },
    { ip: '72.21.192.1', country: 'Virginia' },
    { ip: '99.84.112.1', country: 'Illinois' },
    { ip: '104.16.23.1', country: 'Nevada' },
    { ip: '128.101.101.101', country: 'Minnesota' },
    { ip: '137.83.126.1', country: 'Colorado' },
    { ip: '144.202.52.1', country: 'Washington' },
    { ip: '152.199.19.161', country: 'Georgia' },
    { ip: '157.240.221.35', country: 'North Carolina' },
    { ip: '172.217.14.206', country: 'Arizona' },
    { ip: '192.203.230.10', country: 'Michigan' },
    { ip: '198.51.100.1', country: 'Alabama' },
    { ip: '203.0.113.25', country: 'Alaska' },
    { ip: '204.128.124.11', country: 'Arizona' },
    { ip: '216.58.192.1', country: 'Arkansas' },
    { ip: '72.14.207.99', country: 'California' },
    { ip: '184.72.7.5', country: 'Colorado' },
    { ip: '172.217.18.46', country: 'Connecticut' },
    { ip: '151.101.193.69', country: 'Delaware' },
    { ip: '23.253.113.1', country: 'Florida' },
    { ip: '208.43.143.200', country: 'Georgia' },
    { ip: '156.154.70.1', country: 'Hawaii' },
    { ip: '172.217.14.206', country: 'Idaho' },
    { ip: '198.51.100.75', country: 'Illinois' },
    { ip: '23.45.121.5', country: 'Indiana' },
    { ip: '168.63.76.32', country: 'Iowa' },
    { ip: '156.154.254.10', country: 'Kansas' },
    { ip: '139.82.30.1', country: 'Kentucky' },
    { ip: '65.52.108.1', country: 'Louisiana' },
    { ip: '23.239.0.1', country: 'Maine' },
    { ip: '52.224.128.0', country: 'Maryland' },
    { ip: '40.77.167.72', country: 'Massachusetts' },
    { ip: '70.37.233.2', country: 'Michigan' },
    { ip: '72.215.243.1', country: 'Minnesota' },
    { ip: '70.101.188.52', country: 'Mississippi' },
    { ip: '104.250.198.8', country: 'Missouri' },
    { ip: '185.73.47.1', country: 'Montana' },
    { ip: '50.56.180.85', country: 'Nebraska' },
    { ip: '67.224.1.1', country: 'Nevada' },
    { ip: '68.232.42.23', country: 'New Hampshire' },
    { ip: '167.89.67.1', country: 'New Jersey' },
    { ip: '69.64.6.5', country: 'New Mexico' },
    { ip: '24.5.5.10', country: 'New York' },
    { ip: '157.240.1.35', country: 'North Carolina' },
    { ip: '50.205.254.34', country: 'North Dakota' },
    { ip: '104.79.88.1', country: 'Ohio' },
    { ip: '192.86.154.120', country: 'Oklahoma' },
    { ip: '104.64.38.38', country: 'Oregon' },
    { ip: '107.148.255.99', country: 'Pennsylvania' },
    { ip: '206.87.144.56', country: 'Rhode Island' },
    { ip: '64.70.116.57', country: 'South Carolina' },
    { ip: '45.224.124.90', country: 'South Dakota' },
    { ip: '207.154.1.7', country: 'Tennessee' },
    { ip: '100.24.56.25', country: 'Texas' },
    { ip: '192.168.0.1', country: 'Utah' },
    { ip: '66.210.110.1', country: 'Vermont' },
    { ip: '98.137.128.42', country: 'Virginia' },
    { ip: '208.42.126.34', country: 'Washington' },
    { ip: '54.226.23.99', country: 'West Virginia' },
    { ip: '104.236.16.16', country: 'Wisconsin' },
    { ip: '68.231.13.27', country: 'Wyoming' }
  ];
  
  
  
  

   
  selectedLocation: any;

  changeLocation(event: any): void {
    this.selectedLocation = event.target.value;
    console.log('Selected IP Location:', this.selectedLocation);
    this.indexeddbService.deleteCacheData("location")
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
  
  changeLocation2(event: any): void {
    this.selectedLocation = event.target.value;
    console.log('Selected IP Location:', this.selectedLocation);
    this.indexeddbService.deleteCacheData("location")
    this.indexeddbService.deleteCacheData("maxId")
    this.indexeddbService.deleteCacheData("Type")

    sessionStorage.removeItem("IslocationChanged");

  

    this.accountService.ChangeUserLocation2(this.selectedLocation).subscribe({
      next: (response) => {
        console.log('Response:', response.success);
        console.log('Response data:', response);
       
       
        if(response.success == false){
          this.indexeddbService.saveDataAndEncrypted("location", response.location);
         
        }
        if(response.success){
         
          const types =  this.CreateHouseTypes(response.data);
        

          console.log("house type after location changed: " + JSON.stringify(types));

          //this.indexeddbService.saveDataAndEncrypted("type", types);
          this.indexeddbService.saveDataAndEncrypted("location", response.location);
          this.indexeddbService.saveDataAndEncrypted("maxId", response.data);
          this.indexeddbService.saveDataAndEncrypted("Type", types);
         
          sessionStorage.setItem("IslocationChanged","true")
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
