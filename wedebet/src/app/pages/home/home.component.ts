import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { DataService } from '../../DataServices/data.service';

import { House } from '../../interfaces/house';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/house-data.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideMenuComponent,NgIf,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {

  house: any;
  contactData: any;

  constructor(private dataService: DataService, private housedataservice:HouseDataService ) {
    this.dataService.data$.subscribe(data => 
      {
      this.contactData = data;  
      console.log("Data From Contact: " + this.contactData);
    });
  }
  ngOnInit(): void {
    
     this.housedataservice.houses().subscribe({next:(housedata)=>{
      console.log(housedata)
      this.house = housedata;
      console.log(this.house)
     },error(err) {
       
     },complete() {
       
     },})
    //this.searchinputFromparent
  }
 
}
