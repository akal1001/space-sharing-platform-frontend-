import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HouseDataService } from '../../services/house-data.service';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  accountData:LoginResponse | undefined;
  housetype: string = '';
  constructor(private router: Router, private housedataSrvice:HouseDataService) {

  }
  ngOnInit(): void {
    const storedData = localStorage.getItem('v'); 
    if (storedData) {
      const parsedData:LoginResponse = JSON.parse(storedData);
     this.accountData = parsedData;
  
    } else {
      console.log('No data found in localStorage');
    }
  }

  
  logout() {
   
    localStorage.removeItem('v'); 
    window.location.reload();
    //this.router.navigate(['/login']);

  }
  onSubmit() {
   this.housedataSrvice.InserHouseTypes(this.housetype).subscribe({next:(response)=>
    {
    console.log(response);
   },error(err) {
     console.log(err)
   },});
   
  }
}
