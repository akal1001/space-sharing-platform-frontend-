import { Component, OnInit } from '@angular/core';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { DataService } from '../../data-services/data.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideMenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {

  contactData: any;

  constructor(private dataService: DataService) {
    this.dataService.data$.subscribe(data => 
      {
      this.contactData = data;  
      console.log("Data From Contact: " + this.contactData);
    });
  }

 
}
