import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public route:Router, public storage:LoaclstoarageService, private httpclinent:HttpClient, private account:AccountService) { }
  user:any;
  ngOnInit(): void {
    this.user = this.storage.GetData(this.storage.usertoken);

    if(this.user === null)
    {
        
    }
    else
    {
       
    }
  }
  logout()
    {
       this.account.UserLogout().subscribe((response)=>{
       

         if(response == true)
         {
            this.route.navigateByUrl("/home")
         }
       });
       this.storage.ClearStorage();
    }

}


