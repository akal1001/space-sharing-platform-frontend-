import { Component } from '@angular/core';
import {FormsModule,FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../DataServices/data.service';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoaclstoarageService } from '../../services/loaclstoarage.service';
import { AccountService } from '../../services/account.service';
import { User } from '../../interfaces/user';
import { LoginResponse } from '../../interfaces/login-response';





@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, ReactiveFormsModule,NgClass],
})
export class LoginComponent  {

  //constructor(private router: Router, private dataService: DataService) {}
  constructor(private dataService: DataService, private router: Router, private httpClient: HttpClient, private storageService: LoaclstoarageService, private accountService: AccountService) { }
   user:User={};
   _message:any;
   isSuccess: boolean = false;
  navigateToCreateAccount() 
  {
    this.router.navigate(['/createAccount']);
  }

  loginModel:User = { username: '', userpassword: '' };


  onSubmit() {
    
    this.login();
    
   // this.router.navigate(['/detail'])
    
  }
  messageClass: string = '';
  login() {
    this._message = null; // Reset the message before each login attempt
    this.accountService.UserLoginServe(this.loginModel.username, this.loginModel.userpassword).subscribe({
      next: (response) => 
        {
          const loginResponse:LoginResponse = JSON.parse(JSON.stringify(response));
         
 
        if (loginResponse.success) {
          this._message = loginResponse.message;
          this.messageClass = 'success-message';
          this.isSuccess = true; 
       
          this.dataService.setData(loginResponse.name)
          this.dataService.setloginSucessData(loginResponse.success);
          
          localStorage.setItem("v", JSON.stringify(loginResponse));
       
        } else {
          this._message = loginResponse.message;
          this.isSuccess = false; // Set failure status
          console.error('Login failed:', loginResponse.message);
        }
      },
      error: (error) => {
        this._message = 'An error occurred during login.';
        this.isSuccess = false; // Treat errors as failure
        console.error('Error:', error);
        this._message = 'An error occurred during login.';
        this.isSuccess = false; // Treat HTTP errors as failure
        this.messageClass = 'error-message'; // Set CSS class programmatically
      
      },
      complete: () => {
        console.log('Login request completed.');
      },
    });
  }


  
}
