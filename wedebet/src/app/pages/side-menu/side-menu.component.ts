import { Component } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { JsonPipe, NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { Housetype } from '../../interfaces/housetype';



@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})

export class SideMenuComponent {
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

  isHomeChecked = false; 

  userChecked(option: Option, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    const data: FilterData = {
      houseTypeId: option.houseTypeId,
      isChecked: isChecked, // Assign directly
    };
   
    this.dataService.setFilterData(JSON.stringify(data));
  }
  userChecked_1(option: Option, event: Event){

  }
}
interface Option {
  houseTypeId: string;
}

interface FilterData {
  houseTypeId: string;
  isChecked: boolean;
}

