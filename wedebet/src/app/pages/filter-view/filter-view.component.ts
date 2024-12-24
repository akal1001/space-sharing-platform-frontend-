import { Component } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-filter-view',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './filter-view.component.html',
  styleUrl: './filter-view.component.css'
})
export class FilterViewComponent {
   mydata:any;
   house: any;
   constructor(private dataService: DataService)
   {
     this.dataService.getFilterData$.subscribe({next:(mes)=>{
      
       console.log("mydata " + mes);
       this.mydata = mes;
   
    },error(err) {
     
      console.log(JSON.stringify(err.error))
     
    },})
   
   }
   navTo(data:any,targetRoute:string){
    this.dataService.setData(data);
    this.dataService.navTo(targetRoute);
  } 

  maxDescriptionLength = 50;

  getShortDescription(description: string): string {
    if (description.length > this.maxDescriptionLength) {
      return description.slice(0, this.maxDescriptionLength).trim() + '...';
    }
    return description;
  }
}
