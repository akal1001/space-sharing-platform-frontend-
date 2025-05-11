import { Component } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { NgFor, NgIf } from '@angular/common';
import { ImageTransferService } from '../../services/image-transfer.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [NgIf,NgFor],
  providers: [OpenaiService],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  //ingredients = ['chicken', 'garlic', 'lemon'];
  //ingredients = ['chicken', 'garlic', 'lemon', 'salt', 'pepper', 'olive oil', 'burger bun'];
   ingredients = ["chicken", "garlic", "lemon", "salt", "pepper", "olive oil", "lettuce", "cucumber", "tomato", "red onion", "feta cheese", "olives"];

  recipe: any;
  imageUrl:any;

  constructor(private openaiService: OpenaiService, private imageTransferService:ImageTransferService) {}


  uploadFiletoS3_FromUrl(){
    var imageUrl = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Q3RCgfe7iVPcqDufR5xQbAxi/user-ipQyAKcgccxGWwP55yZ3Yq0H/img-GHCJMcCjFMIuiFgOlY0yNK7T.png?st=2025-05-10T01%3A03%3A58Z&se=2025-05-10T03%3A03%3A58Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-09T22%3A10%3A23Z&ske=2025-05-10T22%3A10%3A23Z&sks=b&skv=2024-08-04&sig=yD0l2JMqwP1n5Mt5BSzgaYniJnnxognusapXxlv/RIU%3D"
   // this.imageTransferService.uploadImageToS3FromUrl(imgUrl).subscribe(response=>{})
   this.imageTransferService.uploadImageToS3FromUrl(imageUrl);
    // this.imageTransferService.uploadImageToS3FromUrl(imageUrl).subscribe({
    //   next: (res) => {
    //     console.log('Upload successful', res);
    //   },
    //   error: (err) => {
    //     console.error('Upload failed', err);
    //   }
    // });
  }

  getRecipe() {
    this.openaiService.generateRecipe(this.ingredients).subscribe({
      next: (data) => {
        this.recipe = data;
        console.log('Recipe:', this.recipe);
        
       
        this.getImageByRecipe(this.recipe); // pass data directly
        
      },
      error: (err) => {
        console.error('Failed to generate recipe', err);
      }
    });
  }
  
  private getImageByRecipe(recipe: any) {
    
    console.log('Generating image for recipe:', recipe);
    this.openaiService.generateImageByRecipe(recipe).subscribe({
      next: (imageUrl) => {
        this.imageUrl = imageUrl;
        console.log('Image URL:', imageUrl);
      },
      error: (err) => {
        console.error('Failed to generate image', err);
      }
    });
  }
  

  getRecipeWithImage() {
    this.openaiService.generateRecipeWithImage(this.ingredients).subscribe({
      next: (data) => {
        this.recipe = data.recipe;
        this.imageUrl = data.fileUrl;  // To store the image URL
        console.log("Recipe:", this.recipe);
        console.log("Image URL:", this.imageUrl);
      },
      error: (err) => {
        console.error('Failed to generate recipe with image', err);
      }
    });
  }

  
  
}
export interface RecipeModel {
  title: string;
  ingredients: string[];
  preparation_steps: string[];
  cookingTime: string | null;
}
