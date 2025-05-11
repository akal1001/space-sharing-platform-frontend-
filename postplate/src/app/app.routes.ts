import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { DetailComponent } from './pages/detail/detail.component';
import { RecipeComponent } from './pages/recipe/recipe.component';


export const routes: Routes = [
   { path: 'home', component: HomeComponent},
   { path: 'detail', component:DetailComponent},
   { path: 'login', component: LoginComponent},
   { path: 'createAccount', component:CreateAccountComponent},
   { path: 'recipe', component:RecipeComponent} 
];
