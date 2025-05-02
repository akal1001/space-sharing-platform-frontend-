import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HouseDataService } from '../../services/houseData.service';
import { AccountService } from '../../services/account.service';
import { DataService } from '../../DataServices/data.service';

import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { House } from '../../interfaces/house';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  houseData:any;
  house:any[] = [];
  constructor( private router: Router, private accountService: AccountService, private dataService:DataService, private housedataSrvice: HouseDataService) {

  }
  ngOnInit(): void {
   this.GetUserFavePosts();
  }

  onDeleteFav(id: any) {
  
    this.housedataSrvice.DeleteFavoriteHouse(id).subscribe({
      next: (response) => {
       
        this.GetUserFavePosts();
      }, error(err) {
        console.error(err.error);
      },
    
    })

  }

  private GetUserFavePosts(){
    this.housedataSrvice.GetAllMySelectionPost(1,50).subscribe({next:(response)=>{
    
      this.houseData = response.data
      console.log(this.houseData);
      for(var i = 0; i < this.houseData.length; i ++){
       console.log(response.data[i]);
      // this.house.push(response.data[i])
      }
      //this.house = response.data.house;
     
    
     },error(err) {
       
     },})
  }

  navigateTo(data: any, targetRoute: string, id:string): void {
    this.dataService.setData(data);
    this.dataService.navToWithId(targetRoute, id);
  }
}


