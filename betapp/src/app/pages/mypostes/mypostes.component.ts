import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { House } from 'src/app/interfaces/house';
import { AccountService } from 'src/app/services/account.service';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';

@Component({
  selector: 'app-mypostes',
  templateUrl: './mypostes.component.html',
  styleUrls: ['./mypostes.component.css']
})
export class MypostesComponent implements OnInit {

  houses:any[] = []
  constructor(private router:Router, public houseservice:HomeService, public storage:LoaclstoarageService, private account:AccountService ) { }

  ngOnInit(): void {
    this.getallmyposts();
  }
 

  
  getallmyposts()
  { 

    let  id =  this.storage.GetData(this.storage.usertoken);
    if(id ==null)
    {
      this.router.navigateByUrl("/login")
    }
    else
    {
      this.account.GetAllMyPost().subscribe((response)=>{
        this.houses = response;
      })
    }
  
  }
  delete(id:any)
  {
      let token = this.storage.GetData(this.storage.usertoken).usertoken;
     
    this.houseservice.DeleteHouseService(id,token).subscribe((response)=>{
      
      if(response == true)
      {
        
        var element = document.getElementById(id);
       
         element?.remove();
      }
    })
  }
}
