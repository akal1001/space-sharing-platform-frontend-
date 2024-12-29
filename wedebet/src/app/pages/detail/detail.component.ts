import { Component, OnInit } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { HouseDataService } from '../../services/houseData.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDetail } from '../../interfaces/house-detail';
import { House } from '../../interfaces/house';
import { Address } from '../../interfaces/address';
import { Contact } from '../../interfaces/contact';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  selectedImage: string | null = null;
  //houeseDetail!: HouseDetail;
  houeseDetail: HouseDetail = {
    house: {} as House, 
    address: {} as Address, 
    contact: {} as Contact, 
    images: [] 
  };
  
    // Placeholder for house data
  constructor(private dataService: DataService, private housedataserveice:HouseDataService) {

  }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.dataService.data$.subscribe(housId => {
     
      this.houeseDetail = housId
      this.selectedImage = this.houeseDetail.images[0].imageUrl;
      console.log(this.houeseDetail)
      // this.housedataserveice.houseDetail(housId).subscribe(response => 
      // {
      //   this.houeseDetail = response.data
      //      console.log(this.houeseDetail);
          
      //  this.selectedImage =  this.houeseDetail?.images[0].imageUrl || null;
      //  // this.houeeDetail = data.data;
       
    
      // });
    })

   
  }
  updateMainImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }
}
