import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { HouseDataService } from '../../services/houseData.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
houseData:any;
  house:any[] = [];
  constructor( private router: Router, private dataService:DataService, private accountService: AccountService, private housedataSrvice: HouseDataService) {

  }
  ngOnInit(): void {
   this.GeTop3Post();
  }

  onDeleteFav(id: any) {
   
   
  }

  private GeTop3Post(){
    this.housedataSrvice.GetTop3HousePost().subscribe({next:(response)=>{
    
      this.houseData = response.data
      console.log(this.houseData);
      for(var i = 0; i < this.houseData.length; i ++){
       console.log(response.data[i]);
      // localStorage.setItem("houseData",JSON.stringify(this.houseData))
      // this.house.push(response.data[i])
      }
      //this.house = response.data.house;
     
    
     },error(err) {
       
     },})
  }

  _navTo(data: any, targetRoute: string) {

    this.dataService.setData(data);
    this.dataService.navTo(targetRoute);
  }

}


