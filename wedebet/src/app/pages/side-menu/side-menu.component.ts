import { Component } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/houseData.service';
import { Housetype } from '../../interfaces/housetype';



@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(private dataService: DataService, private housedatasrvice:HouseDataService) {}

  data:any;
  ngOnInit() {
  this.housedatasrvice.AvailablehouseTypes().subscribe(
    {next:(response)=>{

      this.data = response.data;
      console.log("type " +JSON.stringify(response.data))
  },error(err) {
    
  },complete() {
    
  },})
   
  }



  

  isHomeChecked = false; // Default value for the "Home" checkbox

  userChecked(option: any, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`Option: ${JSON.stringify(option)}, Checked: ${isChecked}`);
    
   
    this.dataService.setFilterData(option.houseTypeId);

    // Add your custom logic here
  }
}
