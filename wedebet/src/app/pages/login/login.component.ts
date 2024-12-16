import { Component } from '@angular/core';
import {FormsModule,FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../DataServices/data.service';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoaclstoarageService } from '../../services/loaclstoarage.service';
import { AccountService } from '../../services/account.service';
import { User } from '../../interfaces/user';





@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginComponent  {

  //constructor(private router: Router, private dataService: DataService) {}
  constructor(private dataService: DataService, private router: Router, private httpClient: HttpClient, private storageService: LoaclstoarageService, private accountService: AccountService) { }
   user:User={};
   _message:any;
  navigateToCreateAccount() 
  {
    this.router.navigate(['/createAccount']);
  }

  loginModel:User = { username: '', userpassword: '' };


  onSubmit() {
    
    this.login();
    //this.dataService.setData(this.loginModel.username)
   // this.router.navigate(['/detail'])
    
  }

  login() {
    this.accountService.UserLoginServe(this.loginModel.username, this.loginModel.userpassword).subscribe((response) => {
     this._message = null;
      const _response: { success: string; message: string; name: string; id: string, token:string } = JSON.parse(JSON.stringify(response));
      if (_response.success) {
        this._message = _response.message;
        console.log('User ID:', _response.id);
        console.log('User Name:', _response.name);
        console.log('Token:', _response.token);
      } else {
        console.error('Login failed:', _response.message);
      }
  
    }, (error: HttpErrorResponse) => {
      // Handle HTTP errors
      if (error.status === 401) {
        this._message = error.error.message;
        console.error('Unauthorized:', error.error?.message || 'Invalid credentials.');
      } else if (error.status === 400) {
        this._message = error.error.message;
        console.error('Bad Request:', error.error?.message || 'Username or Password missing.');
      } else {
        console.error('Unexpected error:', error.message);
      }
    })
  }
 
  
 
}
