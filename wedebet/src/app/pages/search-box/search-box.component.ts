import { Component, OnInit, HostListener } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { DataService } from '../../DataServices/data.service';
import { HouseDataService } from '../../services/houseData.service';
import { IndexeddbService } from '../../services/indexeddb.service';
import { Router } from '@angular/router';

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

  constructor(private dataService:DataService, private router:Router, private housedataserveice:HouseDataService, private indexedDbService:IndexeddbService) {
   
  }

  ngOnInit(): void {
   
   
   // this.loadLocations();
    this.waitForLocations();
  }



  private waitForLocations(): void {
    const checkInterval = setInterval(() => {
      const result = sessionStorage.getItem("allLocations");
     
      if (result) {
        clearInterval(checkInterval); // Stop checking once data is found


        if (typeof result === "string") {
          this.data = JSON.parse(result); // Parse only if it's a string
      } else {
          this.data = result; // Assign directly if it's already an array
      }

        
        console.log("parsedData locations:", this.data);
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
    console.log(this.query)
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
    this.query = item.name;//the selectd item could be city or  state 
    //alert("item selected " + JSON.stringify(item))// shows the full location plus the selected item
    
    this.dataService.setSearchInputData(item)
    this.selectedIndex = -1;
   
    setTimeout(() => (this.showResults = false), 100);

   // this.navigateTo(item.name,"search-result",item.name);
    //this.navigateTo(item.name,"home","");
    this.router.navigate(["filterView"])
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


  
  navigateTo(data: any, targetRoute: string, id:string): void {
    this.dataService.setFilterData(data);
    this.dataService.navToWithId(targetRoute, id);
  }

  GetCountryRegionCity(country: any, state: any, city: any) {
    this.housedataserveice.fetchLocationWithMaxIdManually(country,state,city).subscribe(response=>{
      
      sessionStorage.setItem("allLocations",JSON.stringify(response.locations));

      this.indexedDbService.saveDataAndEncrypted('location', response.location);
      this.indexedDbService.saveDataAndEncrypted('maxId', response.data);


      sessionStorage.setItem("locChanged","yes");
      
    })
  }




}
