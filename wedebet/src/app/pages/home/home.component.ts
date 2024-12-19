import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { DataService } from '../../DataServices/data.service';
import { Router, RouterOutlet } from '@angular/router';
import { House } from '../../interfaces/house';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDataService } from '../../services/house-data.service';
import { Route } from '@angular/router';
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

  constructor(private dataService: DataService, private housedataservice:HouseDataService, private router:Router ) {
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
}
