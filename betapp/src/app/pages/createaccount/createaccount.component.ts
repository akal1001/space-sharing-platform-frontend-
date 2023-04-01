import { Component, OnInit, Renderer2 } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { RsaService } from 'src/app/services/rsa.service';
@Component({
   selector: 'app-createaccount',
   templateUrl: './createaccount.component.html',
   styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {

   message: any;
   public user = new User();
   constructor(private accountservice: AccountService, private rsaservice: RsaService, private router: Router, private renderer: Renderer2) { }

   ngOnInit(): void {
   }
   textColor:any;
   fontwet:any;
   createaccount() {


      this.accountservice.postNewUserService(this.rsaservice.encryptWithPublicKey(this.user.username?.toLocaleLowerCase()),
         this.rsaservice.encryptWithPublicKey(this.user.userpassword?.toLocaleLowerCase()),
         this.rsaservice.encryptWithPublicKey(this.user.useremail?.toLocaleLowerCase()),
      ).subscribe((response) => {

         if (response === true) {
            this.textColor = 'green';
            this.message = "account created successfully"
         }
         else {
          
            this.message = "username or email inuse \n account creation failed!"
            this.textColor = 'red';
            
         }
      })

   }
   gotologin() {
      this.router.navigateByUrl("/login");
   }

}
