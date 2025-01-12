import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { HouseDataService } from '../../services/houseData.service';
import { LoginResponse } from '../../interfaces/login-response';

@Component({
  selector: 'app-slideview',
  standalone: true,
  imports: [NgFor],
  templateUrl: './slideview.component.html',
  styleUrl: './slideview.component.css'
})
export class SlideviewComponent {


  accountData: LoginResponse | undefined;
  housetype: string = '';
  admin: any;

  maxDescriptionLength = 100;
  house: any;
  contactData: any;
  constructor(private dataService: DataService, private router: Router, private accountService: AccountService, private housedataSrvice: HouseDataService) {

  }

  _navTo() {
    alert("_navTo Clicd");
  }
  MyPosts() {
    this.accountService.ReturnUserDataFromLocalStorage().subscribe(val => {
      console.log(val?.token);
      var t = val?.token;

      // this.accountService.GetAllMyPost(t).subscribe({
      //   next: (response) => {
      //     console.log(response);
      //     this.house = response.data;
      //   },
      //   error(err) {
      //     console.log(err);
      //   },
      // })
    })
  }
}