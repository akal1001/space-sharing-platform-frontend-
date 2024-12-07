import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { DataService } from '../../DataServices/data.service';
import { ApiService } from '../../APIs/api.service';
import { House } from '../../interfaces/house';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideMenuComponent,NgIf,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {

  house:House | any
  contactData: any;

  constructor(private dataService: DataService, private apiService:ApiService) {
    this.dataService.data$.subscribe(data => 
      {
      this.contactData = data;  
      console.log("Data From Contact: " + this.contactData);
    });
  }
  ngOnInit(): void {
     this.apiService.getallhouseData().subscribe(d=>{
        this.house = d;
        console.log(this.house)
     })
    //this.searchinputFromparent
  }
 
}
