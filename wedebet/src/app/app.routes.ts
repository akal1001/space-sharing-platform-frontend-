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
import { EditComponent } from './pages/edit/edit.component';
import { MainComponent } from './pages/main/main.component';
import { FilterViewComponent } from './pages/filter-view/filter-view.component';
import { AllviewComponent } from './pages/allview/allview.component';
import { AmeharicComponent } from './pages/ameharic/ameharic.component';



export const routes: Routes = [

   { path: '', redirectTo: 'main', pathMatch: 'full' }, // Default route
   { path: 'main', component: MainComponent },
   { path: 'admin', component: AdminComponent },
   { path: 'home', component: HomeComponent },
   { path: 'detail/:id', component: DetailComponent },
   { path: 'login', component: LoginComponent },
   { path: 'createAccount', component: CreateAccountComponent },
   { path: 'upload', component: UploadComponent },
   { path: 'favorite', component: FavoriteComponent },
   { path: 'account', component: AccountComponent },
   { path: 'edit', component: EditComponent },
   { path: 'filterView', component: FilterViewComponent },
   { path: 'allview', component: AllviewComponent },
   { path: 'ameharic', component: AmeharicComponent }
   
 ];
 
