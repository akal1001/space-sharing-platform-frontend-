import { Component } from '@angular/core';

import {FormsModule,FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  accountModel = { 
    username: '', 
    password: '', 
    confirmPassword: '', 
    email: '' 
  };

  onSubmit() {
    if (this.accountModel.password !== this.accountModel.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    console.log('Account created:', this.accountModel);
    // Add logic to process the account creation
  }
}
