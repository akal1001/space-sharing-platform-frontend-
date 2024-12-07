import { Component, HostListener, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
import { SearchResultComponent } from '../search-result/search-result.component';

// import { DataService } from '../../DataServices/data.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, FormsModule, SearchResultComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  title = 'responsive-header';
  searchText: string = '';
  isMenuOpen = false
  searchResults: string[] = [];
  showResults = false;
  username:any;
  constructor(private router: Router, private dataservice:DataService) {
     this.dataservice.data$.subscribe(d=>{
       this.username = d;
     })
  }

  ngOnInit() 
  {
    this.router.navigate(['/home']);
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
     this.addSearchBoxOnSmallDevices();
     window.addEventListener('resize', () => {
       this.addSearchBoxOnSmallDevices();
     });
    }
   
  }

  toggleMenu()
  {
    this.isMenuOpen = !this.isMenuOpen;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log("resize event fired")
    this.addSearchBoxOnSmallDevices();
  }

  addSearchBoxOnSmallDevices() {
    
    const welcomeContainer = document.getElementById('welcome-container') // Get the welcome container
      const searchBoxExists = document.getElementById('search-box'); // Check if the search box already exists
    
      // If screen width is small and the search box doesn't already exist
      if (window.innerWidth <= 768 && !searchBoxExists) {
        const searchBox = document.createElement('input'); // Create the search box
        searchBox.setAttribute('type', 'text');
        searchBox.setAttribute('placeholder', 'Search');
        searchBox.setAttribute('id', 'search-box'); // Set a unique ID
        searchBox.value = this.searchText; // Set the current value of the textbox
    
       
        // Apply styles
        searchBox.style.position = 'relative';
        searchBox.style.padding = '0.5rem';
        searchBox.style.width = '97%';
        searchBox.style.border = '1px solid #ccc';
        searchBox.style.borderRadius = '1px';
    
        // Attach the same event handlers as in the Angular template
        searchBox.addEventListener('focus', () => {
          this.showResults = true; // Show the search results
        });
    
        searchBox.addEventListener('blur', () => {
          setTimeout(() => {
            this.showResults = false; // Hide the search results after a delay
          }, 200);
        });
    
        searchBox.addEventListener('input', (event: Event) => {
          const target = event.target as HTMLInputElement;
          this.searchText = target.value; // Update the `searchText` variable
          this.onSearch(this.searchText); // Call the search logic
        });
     
        welcomeContainer?.appendChild(searchBox); // Append it to the welcome container
      } 
      // If screen is larger than 768px, remove the search box if it exists
      else if (window.innerWidth > 768 && searchBoxExists) {
        welcomeContainer?.removeChild(searchBoxExists); // Remove the search box if screen is larger than 768px
      }
   
  }
  
  onFocus(){
    this.showResults = true;
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);
    if(currentUrl != '/'){
      this.router.navigate(['/']);
    }
  }

  // for search compoonent 
  onSearch(query: string): void {
   
    // Mock search results
    if (query) {
      this.searchResults = ['Result 1', 'Result 2', 'Result 3','Result 1', 'Result 2', 'Result 3','Result 1', 'Result 2', 'Result 3'].filter((result) =>
        result.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.searchResults = [];
    }
  }

  onBlur(): void {
    console.log("on focus now")
    // Delay hiding the results to allow clicks on them
    setTimeout(() => (this.showResults = false), 200);
    
  }



  //navigations
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToCreateAccount() {
    this.router.navigate(['/createAccount']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToUpload() {
    this.router.navigate(['/upload']);
  }
}