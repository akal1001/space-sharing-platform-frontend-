import { Component, OnInit, HostListener } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  query: string = '';
  data: any[] = [];
  showResults = false;
  selectedIndex: number = -1;

  constructor() {
   
  }

  ngOnInit(): void {
   
   
   // this.loadLocations();
    this.waitForLocations();
  }

  private loadLocations(): void {
    const result = sessionStorage.getItem("allLocations");
    console.log("formated locations");
    console.log(JSON.stringify(result));
  

    if (result) {
      const parsedData = JSON.parse(result);
      this.data = parsedData.data || [];
    } else {
      console.log("No data found in session storage.");
    }
  }

  private waitForLocations(): void {
    const checkInterval = setInterval(() => {
      const result = sessionStorage.getItem("allLocations");
      
      if (result) {
        clearInterval(checkInterval); // Stop checking once data is found
        const parsedData = JSON.parse(result);
        this.data = parsedData.data || [];
        console.log("Loaded locations:", this.data);
      } else {
        console.log("Waiting for session storage data...");
      }
    }, 500); // Check every 500ms
  }
  

  




  get filteredData() {
    if (!this.query) return [];
    const lowerQuery = this.query.toLowerCase();
    return this.data.filter((item: { name: string }) =>
      item.name.toLowerCase().startsWith(lowerQuery)
    );
  }

  onSearchChange(): void {
    this.showResults = this.query.length > 0;
  }

  onFocus(): void {
    this.showResults = this.query.length > 0;
    this.selectedIndex = -1;
  }

  onBlur(): void {
    setTimeout(() => (this.showResults = false), 200); // Allows time for click event
  }

  selectItem(item: any): void {
    this.query = item.name;
    this.selectedIndex = -1;
    setTimeout(() => (this.showResults = false), 100);
  }

  clearSearch(): void {
    this.query = '';
    this.onSearchChange();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.showResults || this.filteredData.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredData.length;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + this.filteredData.length) % this.filteredData.length;
        break;
      case 'Enter':
        if (this.selectedIndex >= 0) {
          event.preventDefault();
          this.selectItem(this.filteredData[this.selectedIndex]);
        }
        break;
      case 'Escape':
        this.clearSearch();
        break;
    }
  }
}
