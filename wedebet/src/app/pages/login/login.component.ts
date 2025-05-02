import { Component, OnInit } from '@angular/core';
import {FormsModule,FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../DataServices/data.service';



import { AccountService } from '../../services/account.service';
import { User } from '../../interfaces/user';
import { LoginResponse } from '../../interfaces/login-response';
import { SharedInputValidator } from '../../services/SharedInputValidator';





@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule,NgIf, ReactiveFormsModule],
})
export class LoginComponent implements OnInit  {

  //constructor(private router: Router, private dataService: DataService) {}
  constructor(public sharedInputValidator:SharedInputValidator,private dataService: DataService, private router: Router, private accountService: AccountService) { }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
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
         
         loginResponse.loginDate  = new Date();
         
        if (loginResponse.success) {
          this._message = loginResponse.message;
          this.messageClass = 'success-message';
          this.isSuccess = true; 
          const truncatedName = loginResponse.name.slice(0, 4);
          this.dataService.setUserData(truncatedName)
          this.dataService.setloginSucessData(loginResponse.success);
          
          localStorage.setItem("v", JSON.stringify(loginResponse));
          this.router.navigate(['/main']);
       
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
