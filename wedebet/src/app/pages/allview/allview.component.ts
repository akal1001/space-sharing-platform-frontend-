import { Component, OnInit } from '@angular/core';
import { HouseDataService } from '../../services/houseData.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { IndexeddbService } from '../../services/indexeddb.service';
import { Translator } from '../../Classes/translator';
@Component({
  selector: 'app-allview',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './allview.component.html',
  styleUrl: './allview.component.css'
})
export class AllviewComponent implements OnInit{

    constructor(private indexedDbService: IndexeddbService, private housedataserveice:HouseDataService,  private indexeddbService: IndexeddbService) {
   
     }
  data:any;   
  ngOnInit(): void {
    this.housedataserveice.getallHousesLocations().subscribe({next:(respose)=>{
       console.log("all locatios : " + JSON.stringify(respose.data));
       this.data = respose.data;
       sessionStorage.setItem("allLocations",JSON.stringify(respose.data));
    },error(err) {
      
    },})
  }
  toggleExpand(item: any) {
    item.expanded = !item.expanded;
  
  }
  GetCountryRegionCity(country: any, state: any, city: any) {
    var tr = new Translator();
 
    if(tr.isAmharicString(country.name)){
      country = tr.countryMap[country.name];
    }
   
    this.housedataserveice.fetchLocationWithMaxIdManually(country,state,city).subscribe(response=>{
     
      console.log("response : " + JSON.stringify(response))
      sessionStorage.setItem("allLocations",JSON.stringify(response.locations));

      this.indexedDbService.saveDataAndEncrypted('location', response.location);
      this.indexedDbService.saveDataAndEncrypted('maxId', response.data);


      sessionStorage.setItem("locChanged","yes");
      
    })
  }




}
