import { Component, HostListener, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
import { SearchResultComponent } from '../search-result/search-result.component';
import { AccountService } from '../../services/account.service';

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
  username: any;
  isuserLoggedIn = false;

  IsNewPost = false;
  constructor(private router: Router, private dataservice: DataService, private accountService: AccountService) {

    
    this.dataservice.userdata$.subscribe(d => {
     
      this.username = d;
    })

    this.dataservice.IsUserloginData$.subscribe(x => {

      this.isuserLoggedIn = x;

    })

    this.dataservice.dataCountNewPost$.subscribe((val)=>{
    
      if(val>0)
      {
    
        this.IsNewPost = true;
      }
    })

    this.accountService.ReturnUserDataFromLocalStorage().subscribe({
      next: (userData) => {
        this.isuserLoggedIn = userData?.success ?? false;

        if (userData?.success == true) {
          const truncatedName = userData.name.slice(0, 4);
          dataservice.setUserData(truncatedName);
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Request completed');
      }
    });

  }

  ngOnInit() {
    // this.router.navigate(['/home']);
    // if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    //   this.addSearchBoxOnSmallDevices();
    //   window.addEventListener('resize', () => {
    //     this.addSearchBoxOnSmallDevices();
    //   });
    // }

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.navigateToHome();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log("resize event fired")
    // this.addSearchBoxOnSmallDevices();
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
      searchBox.style.width = '94%';
      searchBox.style.marginBottom = '1%';

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

  onFocus() {
    this.showResults = true;
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);
    if (currentUrl != '/') {
      this.router.navigate(['/']);
    }
  }

  // for search compoonent 
  onSearch(query: string): void {

    // Mock search results
    if (query) {
      this.searchResults = ['Result 1', 'Result 2', 'Result 3', 'Result 1', 'Result 2', 'Result 3', 'Result 1', 'Result 2', 'Result 3'].filter((result) =>
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
  navigateToAccount() {
    if (this.isMenuOpen) {

      this.isMenuOpen = !this.isMenuOpen;
      if (this.isuserLoggedIn) {

        this.router.navigate(['/account']);
      }
      else {
        this.router.navigate(['/login']);

      }

    }
    else{
      this.router.navigate(['/account']);
    }

  }
  navigateToHome() {
    //this.IsNewPost = true;
    this.router.navigate(['/home']);
  }
  navigateToUpload() {
   
  
    // Check if user is logged in
    if (this.isuserLoggedIn === true) {
      this.router.navigate(['/upload']);
    } else {
      this.router.navigate(['/login']);
    }
  
    // Close the menu if it's open
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
  
  navigateToFav() {
    this.router.navigate(['/favorite']);
  }
  ItemViewed(){
    // //window.location.reload();
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    // this.IsNewPost = false;
  
  }
}