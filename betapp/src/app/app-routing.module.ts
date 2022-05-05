import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { CreateaccountComponent } from './pages/createaccount/createaccount.component';
import { DetailComponent } from './pages/detail/detail.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UploaderComponent } from './pages/uploader/uploader.component';
import { FileuploaderComponent } from './pages/fileuploader/fileuploader.component';
import { AddressComponent } from './pages/address/address.component';
import { MypostesComponent } from './pages/mypostes/mypostes.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { ImagesviewComponent } from './pages/imagesview/imagesview.component';


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
  { path: 'upload', component: UploaderComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'account', component: AccountComponent },
  { path: 'fileuploader', component: FileuploaderComponent },
  { path: 'address', component: AddressComponent },
  { path: 'myposts', component: MypostesComponent },
  { path: 'preview', component: PreviewComponent },
   {path: 'imageview', component:ImagesviewComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
