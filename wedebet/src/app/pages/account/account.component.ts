import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  accountData:LoginResponse | undefined;
  
  constructor(private router: Router) {

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
}
