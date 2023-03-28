import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { CreateaccountComponent } from './pages/createaccount/createaccount.component';
import { DetailComponent } from './pages/detail/detail.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { MypostesComponent } from './pages/mypostes/mypostes.component';

import { ImagesviewComponent } from './pages/imagesview/imagesview.component';

import { ListsComponent } from './pages/lists/lists.component';

import { UploadFormComponent } from './pages/upload-form/upload-form.component';
import { SearchComponent } from './pages/search/search.component';


// const routes: Routes = [

//   {
//     path: 'home',
//     component: HomeComponent, // this is the component with the <router-outlet> in the template
//     children: [
//       {
//         path: 'login', // child route path
//         component: LoginComponent, // child route component that the router renders
//       },
//       {
//         path: 'upload',
//         component: UploaderComponent, // another child route component that the router renders
//       },
//     ],
//   },
// ];

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'edit', component: EditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createaccount', component: CreateaccountComponent },

  { path: 'detail/:id', component: DetailComponent },
  { path: 'account', component: AccountComponent },

  { path: 'myposts', component: MypostesComponent },

  { path: 'imageview/:id', component: ImagesviewComponent },
  { path: 'list', component: ListsComponent },

  { path: 'uploadForm', component: UploadFormComponent },
  { path: 'search/:id', component: SearchComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
