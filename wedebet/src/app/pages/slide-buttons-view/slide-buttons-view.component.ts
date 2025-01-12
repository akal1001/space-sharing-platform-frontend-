import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
import { HouseDataService } from '../../services/houseData.service';
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
  constructor(private dataService: DataService, private router:Router, private indexeddbService:IndexeddbService, private housedatasrvice: HouseDataService) { }
   result:any;
   data: any;
  ngOnInit() {


    this.HouseTypes();
    

    // this.housedatasrvice.AvailablehouseTypes().subscribe(
    //   {
    //     next: (response) => {

    //       this.data = response.data;

    //       console.log("data 1" + this.data)

    //     }, error(err) {

    //     }, complete() {

    //     },

    //   });

     

     
  }
  HouseTypes(){
    this.indexeddbService.getData('api/types').then((data) => {
      if (data) {
        console.log('IndexedDB cached data:', data.data);
        this.data = data.data;
      } else {
        console.log('No data found in IndexedDB cache.');
      }
    }).catch((error) => {
      console.error('Error retrieving data from IndexedDB:', error);
    });
  }

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
      houseTypeName: option.houseTypeName, 
    };
  
    this.dataService.setFilterData(data);
  
    console.log('Filter Data:', data);
   

    this.router.navigate(['/filterView']);
  }
}
  

interface FilterData {
  houseTypeId: string;
  houseTypeName: string;
}


