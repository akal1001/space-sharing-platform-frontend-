import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HouseDataService } from '../../services/houseData.service';
import { AccountService } from '../../services/account.service';
import { DataService } from '../../DataServices/data.service';

import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, NgFor,NgIf],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  accountData:LoginResponse | undefined;
  housetype: string = '';
  admin:any;
  mydata:any;
  constructor(private dataService: DataService, private router: Router,private accountService:AccountService, private housedataSrvice:HouseDataService) {

  }
  ngOnInit(): void {
    const storedData = localStorage.getItem('v'); 
    if (storedData) {
      const parsedData:LoginResponse = JSON.parse(storedData);
     this.accountData = parsedData;
  
    } else {
      console.log('No data found in localStorage');
    }
    this.MyPosts();
    this.adminView();
  }

  
  logout() {
   
    localStorage.removeItem('v'); 
    localStorage.removeItem('_v'); 
    window.location.reload();
    //this.router.navigate(['/login']);

  }
  onEdit(editData:any){
    this.dataService.setEditData(editData)
    this.dataService.navTo('edit');
  }
  onDelete(id:any){
    // alert("delete Not implemented yet!")
    this.accountService.ReturnUserDataFromLocalStorage().subscribe(val=>{
      console.log(val?.token);
      var t = val?.token;
      this.accountService.DeleteMyPost(id,t).subscribe({next:(response)=>{
        console.log(response);
        this.house = response.data;
        //this.house = this.house.filter(d => d.house.houseId !== id)
        this.MyPosts();
      },
      error(err) {
        console.log(err.error);
      },})
      // if(val?.name === "admin")
      // {
      //   this.accountService.DeleteMyPost(id,t).subscribe({next:(response)=>{
      //     console.log(response);
      //     this.house = response.data;
      //     //this.house = this.house.filter(d => d.house.houseId !== id)
      //     this.MyPosts();
      //   },
      //   error(err) {
      //     console.log(err.error);
      //   },})
      // }
      // else{
      //   alert("delete Not implemented yet!")
      // }

     
    })

  }
  MyPosts(){
    this.accountService.ReturnUserDataFromLocalStorage().subscribe(val=>{
      console.log(val?.token);
      var t = val?.token;

      this.accountService.GetAllMyPost(t).subscribe({next:(response)=>{
        console.log(response);
        this.house = response.data;
        this.mydata = 1;
        
      },
      error(err) {
        console.log(err);
      },})
    })
   
  }




  maxDescriptionLength = 100;
  house: any;
  contactData: any;

  navToDetail(houseId:string){
    this.dataService.setData(houseId);
    this.router.navigate(['/detail']);

  } 

  getShortDescription(description: string): string {
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength).trim() + '...';
    }
    return description;
  }
  adminView(){
    this.accountService.ReturnUserDataFromLocalStorage().subscribe(val=>{
      console.log(val?.token);
      var t = val?.token;

      if(val?.name === "admin")
      {
        this.admin = val.name;
      }
    
    })
  }
  navTo(targetRoute:any){
    this.dataService.navTo(targetRoute)
   
  }
}
