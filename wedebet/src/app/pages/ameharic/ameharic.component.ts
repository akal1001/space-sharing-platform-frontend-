import { Component } from '@angular/core';
import { AmharicToEnglishTransliterate } from '../../services/amharicToEnglishTransliterate.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ameharic',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './ameharic.component.html',
  styleUrl: './ameharic.component.css'
})
export class AmeharicComponent {

  amharicInput: string = '';   // Input from user
  latinOutput: any = '';    // Single character transliteration result
  tr: string = '';             // Accumulated transliteration

  constructor(private transliterateService: AmharicToEnglishTransliterate) {}

  transliterate(): void {
  
    console.log("input ኦነ " + this.amharicInput)
    this.latinOutput = this.transliterateService.amharicToLatinTransliterate(this.amharicInput);
  
   
    console.log(this.latinOutput);  // Output accumulated transliteration
  }
  
}
