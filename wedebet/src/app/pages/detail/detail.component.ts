import { Component, OnInit } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { HouseDataService } from '../../services/houseData.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDetail } from '../../interfaces/house-detail';
import { House } from '../../interfaces/house';
import { Address } from '../../interfaces/address';
import { Contact } from '../../interfaces/contact';
import { ActivatedRoute } from '@angular/router';

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

  IsDetailData:boolean = false;
  
    // Placeholder for house data
  constructor(private dataService: DataService,private route: ActivatedRoute, private housedataserveice:HouseDataService) {

  }
  ngOnInit(): void {
    console.log("house detail empty " + this.houeseDetail.images.length);
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Received ID:', id);

    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.dataService.data$.subscribe(house => {
     
     
      this.houeseDetail = house
      this.selectedImage = this.houeseDetail.images[0].imageUrl;
      //console.log(this.houeseDetail)

    
    })

    this.housedataserveice.houseDetail(id).subscribe(response => 
      {
        //alert(response)
        this.houeseDetail = response.data
        if(this.houeseDetail.images.length>0){
          this.IsDetailData = true;
        }
          
       this.selectedImage =  this.houeseDetail?.images[0].imageUrl || null;
       // this.houeeDetail = data.data;
       
       //console.log("house detail widdata " + this.houeseDetail.images.length);
      });
  }
  updateMainImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  callPhone() {
    window.location.href = `tel:${this.houeseDetail.contact.phone}`;
  }
}
