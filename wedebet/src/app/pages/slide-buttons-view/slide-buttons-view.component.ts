import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
import { IndexeddbService } from '../../services/indexeddb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide-buttons-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './slide-buttons-view.component.html',
  styleUrl: './slide-buttons-view.component.css'
})
export class SlideButtonsViewComponent implements OnInit {
  buttons = ['all'];
  houseTyeps:any[]=[];

  constructor(private dataService: DataService, private router:Router, private indexeddbService:IndexeddbService) { }
   result:any;
   data: any;

  ngOnInit() {

  this.loadHouseTypes();
  }

  // async loadHouseTypes(){
  //   while(true){
  //     const data:any = await this.indexeddbService.getDecriptedData("data");
  //     console.log("data " + JSON.stringify(data));
  //     var result = await this.CreateHouseTypes(data);
  //     console.log("result : " + result);
     
  //     this.houseTyeps = result;
  //     //const result =  this.loadHouseTypesData(data.data);
  //     console.log("house types data :" + JSON.stringify(result))
  //   }
   
  // }

  async loadHouseTypes() {
    try {
      let data: any = null;
  
      // Loop until valid data is retrieved
      while (!data) {
        data = await this.indexeddbService.getDecriptedData("data");
  
        if (!data) {
          console.warn("Data not found. Retrying...");
          await this.delay(1000); // Wait for 1 second before retrying
          continue;
        }
  
        console.log("Data retrieved: ", JSON.stringify(data));
  
        const result = await this.CreateHouseTypes(data);
        console.log("Result: ", result);
  
        this.houseTyeps = result; // Update the `houseTyeps` property
        console.log("House types data: ", JSON.stringify(result));
      }
    } catch (error) {
      console.error("Error while loading house types: ", error);
    }
  }
  
  // Utility function to introduce a delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  

  private async CreateHouseTypes(response: any): Promise<any[]> {
   
    if (!response || !Array.isArray(response)) {
      console.error('Invalid response data:', response);
      return []; 
    }
    const uniqueHouseTypes = new Map();
    response.forEach((item: { house: { houseTypeId: any; header: any } }) => {
      const houseTypeId = item.house.houseTypeId;
      const header = item.house.header;
      if (!uniqueHouseTypes.has(houseTypeId)) {
        uniqueHouseTypes.set(houseTypeId, { houseTypeId, header });
      }
    });
    console.log("t " + uniqueHouseTypes)
    return Array.from(uniqueHouseTypes.values());
  }
  
    
  // private delay(ms: number): Promise<void> {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  

  onClicked(option: any, event: Event): void {
    const target = event.target as HTMLButtonElement;
    if(option =="all"){
      location.reload();
      return;
    }
    
    if (!target) {
      console.error('Event target is not a valid button element');
      return;
    }
  
    const data: FilterData = {
      houseTypeId: option.houseTypeId,
      houseTypeName: option.header, 
    };
  
    this.dataService.setFilterData(data);
   
    this.router.navigate(['/filterView']);
  }
}
  

interface FilterData {
  houseTypeId: string;
  houseTypeName: string;
}


