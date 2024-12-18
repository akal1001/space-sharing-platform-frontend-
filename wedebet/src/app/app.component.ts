import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from "./pages/header/header.component"; // Adjust path as needed
import { FooterComponent } from './pages/footer/footer.component';

import { DataService } from './DataServices/data.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'wedebet';
  data: any;

  constructor( private dataservice:DataService) { }

  ngOnInit() {

    
  

  }
}
