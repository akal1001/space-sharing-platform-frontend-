import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { DataService } from '../../DataServices/data.service';
import { Router, RouterOutlet } from '@angular/router';
import { House } from '../../interfaces/house';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { Route } from '@angular/router';
import { VersionService } from '../../services/version.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideMenuComponent,NgIf,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  maxDescriptionLength = 100;
  house: any;
  contactData: any;

  constructor(private dataService: DataService,private versionservice:VersionService, private housedataservice:HouseDataService, private router:Router ) {
    this.dataService.data$.subscribe(data => 
      {
      this.contactData = data;  
      console.log("Data From Contact: " + this.contactData);
    });
  }
  ngOnInit(): void {

     this.CheckVersion();
    
     this.housedataservice.houses().subscribe({next:(housedata)=>{
      console.log(housedata)
      this.house = housedata;
      console.log(this.house)
     },error(err) {
       
     },complete() {
       
     },})


    
   
   
  }

  navToDetail(houseId:string){
    this.dataService.setData(houseId);
    this.router.navigate(['/detail']);

  } 


  getShortDescription(description: string): string {
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength).trim() + '...';
    }
    return description;
  }

  CheckVersion() {
    // Set initial version in localStorage (if not already set)
    const storedVersion = localStorage.getItem("_v") || "1.1.0";
    localStorage.setItem("_v", storedVersion);
  
    this.versionservice.GetVersionServe().subscribe({
      next: (response) => {
        console.log(response.success);
        console.log(response.status);
        console.log("Version from Server: " + response.data);
  
        if (response.success) {
          console.log("Stored Version: " + storedVersion);
          console.log("Version from Server: " + response.data);
  
          // Check if the versions differ
          if (storedVersion !== response.data) {
            // Update the stored version
            localStorage.setItem("_v", response.data);
  
            // Reload the page
            location.reload();
          }
        }
      },
      error: (err) => {
        console.error("Error fetching version:", err);
      },
      complete: () => {
        console.log("Version check complete");
      },
    });
  }
  
}
