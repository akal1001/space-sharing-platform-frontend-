import { Component } from '@angular/core';
import { HouseDataService } from '../../services/houseData.service';


import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { DataService } from '../../DataServices/data.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  housetype: string = '';
  constructor(private housedataservice:HouseDataService){}
  onSubmit() {
    this.housedataservice.InserHouseTypes(this.housetype).subscribe({next:(response)=>
     {
     console.log(response);
    },error(err) {
      console.log(err)
    },});
    
   }
}
