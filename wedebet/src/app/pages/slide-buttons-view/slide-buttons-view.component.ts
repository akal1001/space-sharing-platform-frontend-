import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
import { HouseDataService } from '../../services/houseData.service';

@Component({
  selector: 'app-slide-buttons-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './slide-buttons-view.component.html',
  styleUrl: './slide-buttons-view.component.css'
})
export class SlideButtonsViewComponent {
  buttons = ['all'];
  constructor(private dataService: DataService, private housedatasrvice: HouseDataService) { }

  data: any;
  ngOnInit() {
    this.housedatasrvice.AvailablehouseTypes().subscribe(
      {
        next: (response) => {

          this.data = response.data;

        }, error(err) {

        }, complete() {

        },
      })

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
  }
}
  

interface FilterData {
  houseTypeId: string;
  houseTypeName: string;
}


