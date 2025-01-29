import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'    
})
export class SharedInputValidator {
    inputValues: { [key: string]: string } = {};  // Store input values by input id
    exceededLimits: { [key: string]: boolean } = {}; // Track if any input exceeds the limit
    inputLengths: { [key: string]: number } = {}; // Store input lengths by id
  
    onInputChange(event: Event, maxLength: number, id: string): void {
      const inputElement = event.target as HTMLInputElement;
      const inputValue = inputElement.value;
  
      // Check if the value exceeds maxLength
      if (inputValue.length > maxLength) {
        this.inputValues[id] = inputValue.substring(0, maxLength);  // Truncate input
        inputElement.value = this.inputValues[id];  // Update input field's value
        this.exceededLimits[id] = true;  // Set exceeded limit for this input
      } else {
        this.inputValues[id] = inputValue;
        this.exceededLimits[id] = false;  // Reset exceeded limit flag
      }
  
      // Update the input length
      this.inputLengths[id] = this.inputValues[id].length;
    }
  }
  