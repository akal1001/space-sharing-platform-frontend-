import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AccountService } from 'src/app/services/account.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { DataService } from 'src/app/services/data.service';
import { RsaService } from 'src/app/services/rsa.service';
import { FormGroup } from '@angular/forms';



//import xml2js from 'xml2js';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: any;
  public user = new User();
  constructor(private service: DataService, private rsaservice: RsaService, private router: Router, private httpClient: HttpClient, private storageService: LoaclstoarageService, private accountService: AccountService) { }

  ngOnInit(): void {

    console.log(this.data)

   
  }
  submit()
  {
     console.log("submit called")
  }

  getKey()
  {
     this.accountService.GetKey().subscribe((resposen)=>{
       alert(resposen.testKey)
     })
  }


  login() {

    let UsernameOrEmail = this.rsaservice.encryptWithPublicKey(this.user.username?.toLocaleLowerCase());
   
    var passeord = this.rsaservice.encryptWithPublicKey(this.user.userpassword?.toLocaleLowerCase());

    this.accountService.UserLoginServe(UsernameOrEmail, passeord).subscribe((response) => {

      console.log(JSON.stringify(response))
      if (response[0] != null) {
        let u = new User();
        u.userid = response[1];
        u.username = response[0];
        u.usertoken = response[2];
        this.storageService.SetData(this.storageService.usertoken, JSON.stringify(u))
        u = new User();
        this.user = new User();
        this.router.navigate([''])
      }
      else {
        alert("usrname or password wrong!")
      }

    })
  }

  getdata() {
    var res = this.storageService.GetData(this.storageService.usertoken);
    alert(JSON.stringify(res));
    //alert(JSON.parse(res));

  }

  //   parseXML(data: string) {  
  //     return new Promise(resolve => {  
  //       var k: string | number,  
  //         arr: any = [],  
  //         parser = new xml2js.Parser(  
  //           {  
  //             trim: true,  
  //             explicitArray: true  
  //           });  
  //       parser.parseString(data, function (err: any, result: { Employee: any; }) {  
  //         var obj = result.Employee;  
  //         for (k in obj.emp) {  
  //           var item = obj.emp[k];  
  //           arr.push({  
  //             id: item.id[0],  
  //             name: item.name[0],  
  //             gender: item.gender[0],  
  //             mobile: item.mobile[0]  
  //           });  
  //         }  
  //         resolve(arr);  
  //       });  
  //     });  
  //   }  
  // } 


  enc()
  {
     
  }
}