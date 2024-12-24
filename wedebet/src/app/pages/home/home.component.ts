import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { DataService } from '../../DataServices/data.service';
import { Router, RouterOutlet } from '@angular/router';
import { House } from '../../interfaces/house';
import { NgIf, DatePipe, CurrencyPipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { Route } from '@angular/router';
import { VersionService } from '../../services/version.service';
import { FilterViewComponent } from '../filter-view/filter-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideMenuComponent,FilterViewComponent,NgIf,NgFor,DatePipe,CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  maxDescriptionLength = 30;
  house: any;
  contactData: any;
  filteredData:any=null;
  constructor(private dataService: DataService,private versionservice:VersionService, private housedataservice:HouseDataService, private router:Router ) {
   
    this.dataService.getFilterData$.subscribe({next:(value)=>
    {
        this.filteredData = value;    

    },error:(eror)=>{
      console.log(eror.error);
      
    }})
  }
  ngOnInit(): void {

     this.CheckVersion();
    
     this.housedataservice.houses().subscribe({next:(housedata)=>{
     
      this.house = housedata;
     
     },error(err) {
       
     },complete() {


       
     },})


    
   
   
  }

  _navTo(data:any,targetRoute:string){
    this.dataService.setData(data);
    this.dataService.navTo(targetRoute);
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
