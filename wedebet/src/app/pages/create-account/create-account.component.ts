import { Component } from '@angular/core';

import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
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

  _message: any;
  accountModel = {
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  };
  isSuccess: boolean = false;

  messageClass: string = '';
  constructor(private accountService: AccountService) {

  }

  onSubmit() {
   this. createAccount();
  }
  createAccount() {
    this._message = null; 
    this.isSuccess = false; 
    this.messageClass = ''; 
  
    this.accountService.postNewUserService(this.accountModel.username, this.accountModel.password, this.accountModel.email).subscribe({
      next: (response) => {
        if (response.success) {
          this.isSuccess = true;
          this._message = response.message || 'Account created successfully.';
          this.messageClass = 'success-message';
        } else {
          this.isSuccess = false;
          this._message = response.message || 'Signup failed.';
          this.messageClass = 'error-message';
        }
      },
      error: (error) => {
        this.isSuccess = false;
        this._message = error?.error?.message || 'An error occurred during signup.';
        console.error('Signup Error:', error);
        this.messageClass = 'error-message';
      },
      complete: () => {
        console.log('Signup request completed.');
      }
    });
  }
  
}
