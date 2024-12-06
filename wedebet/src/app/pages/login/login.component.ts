import { Component } from '@angular/core';
import {FormsModule,FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../DataServices/data.service';




@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginComponent  {

  constructor(private router: Router, private dataService: DataService) {}

  navigateToCreateAccount() 
  {
    this.router.navigate(['/createAccount']);
  }

  loginModel = { username: '', password: '' };


  onSubmit() {
    console.log(this.loginModel);
   //just to test sending data to app component
    this.dataService.setData(this.loginModel.username)
    this.router.navigate(['/detail'])
    
  }

 
}
