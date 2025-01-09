import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HouseDataService } from '../../services/houseData.service';
import { AccountService } from '../../services/account.service';
import { DataService } from '../../DataServices/data.service';

import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDetail } from '../../interfaces/house-detail';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  accountData: LoginResponse | undefined;
  housetype: string = '';
  admin: any;
  mydata: any;
 

  constructor(private cdr: ChangeDetectorRef,private dataService: DataService, private router: Router, private accountService: AccountService, private housedataSrvice: HouseDataService) {

  }
  ngOnInit(): void {
    const storedData = localStorage.getItem('v');
    if (storedData) {
      const parsedData: LoginResponse = JSON.parse(storedData);
      this.accountData = parsedData;

    } else {
      console.log('No data found in localStorage');
    }
    this.MyPosts();
    this.adminView();
  }
  housesdetails: HouseDetail[] = [];
  pageNumber: number = 1;
  isLoading: boolean = false;
  private scrollTimeout: any;
  
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(() => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
        this.pageNumber += 1;
        this.MyPosts();
      }
    }, 200); // Adjust debounce time as needed
  }
  
  MyPosts(): void {
    
    this.isLoading = true;
    this.housedataSrvice.GetUserPost(this.pageNumber, 15).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data) {
          this.housesdetails.push(...response.data);
         // this.cdr.detectChanges();
        //  console.log( this.housesdetails);

        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err.error);
      },
    });
  }


  logout() {

    localStorage.removeItem('v');
    localStorage.removeItem('_v');
    window.location.reload();
    //this.router.navigate(['/login']);

  }
  onEdit(editData: any) {
    this.dataService.setEditData(editData)
    this.dataService.navTo('edit');
  }
  onDelete(id: any) {
    this.housedataSrvice.DeleteMyPost(id).subscribe({
      next: (response) => {
        
       
        const indexToRemove = this.housesdetails.findIndex(
          (detail) => detail.house.houseId === id
          
        );
         //alert(index)
        if(response.success){
             
          if (indexToRemove >= 0 && indexToRemove < this.housesdetails.length) {
            this.housesdetails.splice(indexToRemove, 1);
            console.log(`Removed item at index: ${indexToRemove}`);
          } else {
            console.log("Invalid index. No item removed.");
          }
        
        }
            
      },
      error(err) {
        console.log(err.error);
      },
    })

  }






  maxDescriptionLength = 100;

  contactData: any;

  navToDetail(houseId: string) {
    this.dataService.setData(houseId);
    this.router.navigate(['/detail']);

  }

  getShortDescription(description: string): string {
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength).trim() + '...';
    }
    return description;
  }
  adminView() {
    this.accountService.ReturnUserDataFromLocalStorage().subscribe(val => {
      console.log(val?.token);
      var t = val?.token;

      if (val?.name === "admin") {
        this.admin = val.name;
      }

    })
  }
  navTo(targetRoute: any) {
    this.dataService.navTo(targetRoute)

  }
}
