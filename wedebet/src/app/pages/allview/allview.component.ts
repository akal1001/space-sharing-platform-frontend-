import { Component, OnInit } from '@angular/core';
import { HouseDataService } from '../../services/houseData.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { IndexeddbService } from '../../services/indexeddb.service';
@Component({
  selector: 'app-allview',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './allview.component.html',
  styleUrl: './allview.component.css'
})
export class AllviewComponent implements OnInit{

    constructor( private housedataserveice:HouseDataService,  private indexeddbService: IndexeddbService) {
   
     }
  data:any;   
  ngOnInit(): void {
    this.housedataserveice.getallHousesLocations().subscribe({next:(respose)=>{
       console.log("all locatios : " + JSON.stringify(respose.data));
       this.data = respose.data;
       sessionStorage.setItem("allLocations",JSON.stringify(respose.data));
    },error(err) {
      
    },})
  }
  toggleExpand(item: any) {
    item.expanded = !item.expanded;
  }
  GetCountryRegionCity(country: any, state: any, city: any) {
    this.indexeddbService.deleteCacheData("location")
    this.indexeddbService.deleteCacheData("maxId")
    //this.indexeddbService.deleteCacheData("Type")

    sessionStorage.removeItem("IslocationChanged");
    this.housedataserveice.GetHouseMaxId().subscribe({
      next: (apiResponse) => {
        // Now create the response object after getting the max ID
        const response = {
          success: true,
          data: apiResponse.data, // Assuming API response structure
          location: {
            country: country.name,
            region: state.name,
            city: city.name
          }
        };

  
        console.log(response);

        this.indexeddbService.saveDataAndEncrypted("location", response.location);
        this.indexeddbService.saveDataAndEncrypted("maxId", response.data);
      //  this.indexeddbService.saveDataAndEncrypted("Type", types);
       
        sessionStorage.setItem("IslocationChanged","true")
      },
      error: (err) => {
        console.error("Error fetching max ID:", err);
      }
    });
  }
  
}
