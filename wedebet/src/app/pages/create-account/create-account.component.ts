import { Component } from '@angular/core';

import {FormsModule,FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  _message:any;
  accountModel = { 
    username: '', 
    password: '', 
    confirmPassword: '', 
    email: '' 
  };
isSuccess: any;
  constructor(private accountService:AccountService){

  }

  onSubmit() {
    this.accountService.postNewUserService(this.accountModel.username,this.accountModel.password, this.accountModel.email).subscribe((r)=>{
      console.log(r.message);
      console.log(r.success);
      this._message = r.message;
    })
   
    // Add logic to process the account creation
  }
}
