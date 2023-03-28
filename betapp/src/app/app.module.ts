import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptorService } from './services/interceptor.service';
import { HomeComponent } from './pages/home/home.component';
import { ProgressbarComponent } from './pages/progressbar/progressbar.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateaccountComponent } from './pages/createaccount/createaccount.component';
import { EditComponent } from './pages/edit/edit.component';

import { DetailComponent } from './pages/detail/detail.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MypostesComponent } from './pages/mypostes/mypostes.component';
import { NgImageSliderModule } from 'ng-image-slider';

import { MatFormFieldModule } from '@angular/material/form-field';

import { ImagesviewComponent } from './pages/imagesview/imagesview.component'

import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from "@angular/common";
import { ListsComponent } from './pages/lists/lists.component';

import { UploadFormComponent } from './pages/upload-form/upload-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { LayoutModule } from '@angular/cdk/layout';
import { SearchComponent } from './pages/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProgressbarComponent,
    AccountComponent,
    LoginComponent,
    CreateaccountComponent,
    EditComponent,

    DetailComponent,

    MypostesComponent,


    ImagesviewComponent,
    ListsComponent,

    UploadFormComponent,
      SearchComponent,
    

  ],
  imports: [
   
    CommonModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
 
    MatProgressBarModule,
    MatFormFieldModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    NgxJsonViewerModule,
    NgImageSliderModule,

    ReactiveFormsModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    LayoutModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
