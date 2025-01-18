import { Component } from '@angular/core';
import { HouseDataService } from '../../services/houseData.service';
import { NgFor } from '@angular/common';

import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { DataService } from '../../DataServices/data.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  housetype: string = '';
  inputValue:any;
  appVerison:any;
  constructor(private housedataservice:HouseDataService, private addminService:AdminService){
     this.addminService.getversion().subscribe({next:(response)=>{
      this.appVerison = response.data;
     },error:(error)=>{
        console.log(error.error);
     }})

     this.GeGEOLoc();
  }
  onSubmitType() {
    this.housedataservice.InserHouseTypes(this.housetype).subscribe({next:(response)=>
     {
     console.log(response);
    },error(err) {
      console.log(err)
    },});
    
   }

   onSubmitVersion() {
    this.addminService.addVersionServe(this.inputValue).subscribe({next:(response)=>
     {
     console.log(response);
     
    },error(err) {
      console.log(err)
    },});
    
   }

   geoLoc:any;

   GeGEOLoc(){
    this.addminService.getGeoLocation().subscribe({next:(response)=>{
      this.geoLoc = response;
    },error(err) {
      
    },})
   }
}
