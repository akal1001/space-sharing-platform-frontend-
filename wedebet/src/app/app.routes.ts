import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';

import { DetailComponent } from './pages/detail/detail.component';
import { UploadComponent } from './pages/upload/upload.component';


export const routes: Routes = [
   { path: 'home', component: HomeComponent},
   { path: 'detail', component:DetailComponent},
   { path: 'login', component: LoginComponent},
   { path: 'createAccount', component:CreateAccountComponent}, 
   { path: 'upload', component:UploadComponent} 
];
