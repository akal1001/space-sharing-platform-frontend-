import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from "./pages/header/header.component"; // Adjust path as needed
import { FooterComponent } from './pages/footer/footer.component';

import { DataService } from './DataServices/data.service';
import { VersionService } from './services/version.service';
import { SideMenuComponent } from "./pages/side-menu/side-menu.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, HeaderComponent, FooterComponent,SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'wedebet';
  data: any;
  version:any = "1.0.0";
  constructor( private dataservice:DataService,private versionSrvice:VersionService, private router:Router) { }

  ngOnInit() {
   
    this.versionSrvice.GetVersionServe().subscribe({next:(response)=>
      {
        console.log(response.success);
        console.log(response.status);
        console.log("varsion: " + response.data);

      },
      error(err) {
        console.log(err)
    },complete() {
        console.log(
          "version check complete"
        )
    },})
    this.router.navigate(['/home']);

  }
  reload() {
    location.reload();
  }
}
