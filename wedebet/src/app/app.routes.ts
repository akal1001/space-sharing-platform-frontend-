import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';

import { DetailComponent } from './pages/detail/detail.component';
import { UploadComponent } from './pages/upload/upload.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminComponent } from './pages/admin/admin.component';


export const routes: Routes = [
   { path: 'home', component: HomeComponent},
   { path: 'detail', component:DetailComponent},
   { path: 'login', component: LoginComponent},
   { path: 'createAccount', component:CreateAccountComponent}, 
   { path: 'upload', component:UploadComponent},
   {path:'favorite', component:FavoriteComponent},
   {path:'account',component:AccountComponent},
   {path:'admin',component:AdminComponent}

];
