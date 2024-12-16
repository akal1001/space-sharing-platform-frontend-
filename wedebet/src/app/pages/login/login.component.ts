import { Component } from '@angular/core';
import {FormsModule,FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../DataServices/data.service';

import { HttpClient } from '@angular/common/http';
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
  navigateToCreateAccount() 
  {
    this.router.navigate(['/createAccount']);
  }

  loginModel:User = { username: '', userpassword: '' };


  onSubmit() {
    
    this.login();
    //this.dataService.setData(this.loginModel.username)
    this.router.navigate(['/detail'])
    
  }

  login() {



    this.accountService.UserLoginServe(this.loginModel.username, this.loginModel.userpassword).subscribe((response) => {

      console.log(JSON.stringify(response))
      if (response[0] != null) {
        const u: User = {
          userid: response[1],
          username: response[0],
          usertoken: response[2],
        };
      
        alert(u.username  + " " + u.usertoken + " " + u.userid)

        this.storageService.SetData(this.storageService.usertoken, JSON.stringify(u));
      
        // Resetting the user object
        const emptyUser: User = { userid: '', username: '', usertoken: '' };
        this.user = emptyUser;
      
        // Navigate to another route
        this.router.navigate(['']);
      }
      
      else {
        alert("usrname or password wrong!")
      }

    })
  }

 
}
