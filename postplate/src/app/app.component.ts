import { Component, OnInit, HostListener  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { SearchResultsComponent } from "./pages/search-results/search-results.component";
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from "./pages/header/header.component"; // Adjust path as needed
import { FooterComponent } from './pages/footer/footer.component';
import { DataService } from './data-services/data.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  {
   
  recivedData:any;
  constructor(private dataService: DataService){

     this.dataService.data$.subscribe(data=>{
      console.log("app component recive :" + data);
      this.recivedData = data;
     })} 
}