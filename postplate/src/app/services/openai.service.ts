import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  //private apiUrl = 'https://sjksn32uof.execute-api.us-east-1.amazonaws.com/Prod/api/food/postIngredients'; // replace with actual URL

  private apiUrl = 'https://localhost:51245/api/food/'
   
  constructor(private httpClient: HttpClient) {}

  generateRecipe(ingredients: string[]): Observable<any> {
    const body = { ingredients };
    return this.httpClient.post<any>(this.apiUrl +'postIngredients', body);
  }


  generateImageByRecipe(recipe: any): Observable<any> {
    const body = { recipe };
    console.log("data for image  " + JSON.stringify(body));

    return this.httpClient.post<any>(this.apiUrl + 'postImage', body);
  }

  generateRecipeWithImage(ingredients: string[]): Observable<any> {
    const body = { ingredients };
    return this.httpClient.post<any>(this.apiUrl + 'postFoodWithImage', body);
  }
  
}
