import { Component, OnInit } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { HouseDataService } from '../../services/houseData.service';
import { NgClass, NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { HouseDetail } from '../../interfaces/house-detail';
import { House } from '../../interfaces/house';
import { Address } from '../../interfaces/address';
import { Contact } from '../../interfaces/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { Translator } from '../../Classes/translator';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf,NgFor, NgClass],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  selectedImage: string | null = null;
  //houeseDetail!: HouseDetail;
  d: HouseDetail = {
    house: {} as House, 
    address: {} as Address, 
    contact: {} as Contact, 
    images: [] ,
    isLiked:false
  };
translator:Translator = new Translator();
  IsDetailData:boolean = false;
  
    // Placeholder for house data
  constructor(private dataService: DataService,private route: ActivatedRoute,private router: Router, private housedataserveice:HouseDataService) {

  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Received ID:', id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Load data from API first and also try to load from cache concurrently
    this.loadPostDetails(id);
    await this.loadFromApi(id);
    
  }
  
  private async loadPostDetails(id: string | null): Promise<void> {
    // Attempt to load data from local cache
    this.dataService.data$.pipe(take(1)).subscribe(house => {
      //alert("call");
  
      if (house && house.images?.length > 0) {
        // If cache data is available, use it immediately
        console.log("Loaded from local service (cache)", house);
        this.d = house;
        this.selectedImage = house.images[0].imageUrl;
        this.IsDetailData = true;
      } else {
        console.log("No cached data available.");
      }
    });
  }
  
  private loadFromApi(id: string | null): Promise<void> {
    console.log('Loading post from API:', id);
  
    return new Promise((resolve, reject) => {
      this.housedataserveice.houseDetail(id).subscribe({
        next: (response) => {
          if (response?.data && response.data.images?.length > 0) {
            console.log("Loaded from API", response.data);
            this.d = response.data;
            this.selectedImage = response.data.images[0].imageUrl;
            this.IsDetailData = true;
            resolve();
          } else {
            console.warn("No data found. Redirecting to main.");
            this.router.navigate(['/main']);
            reject('No data found');
          }
        },
        error: (error) => {
          console.error("API error. Redirecting to main.", error);
          this.router.navigate(['/main']);
          reject('API error');
        }
      });
    });
  }

  housesDetails: HouseDetail[] = []; // Initialize as empty array
  userSavedhouseIds: string[] = []; // should be fetched from backend or service
  toggleLike(houseId: string): void {
    this.housedataserveice.AddUserSelectionPost(houseId).subscribe({
      next: () => {
        // Update local state after successful request
        const house = this.housesDetails.find(h => h.house.houseId === houseId);
        if (house) {
          house.isLiked = !house.isLiked;
        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert("Please log in to access this feature.");
        } else {
          console.error("Error while liking the house:", err);
        }
      },
    });
  }
  
  
  



  updateMainImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  callPhone() {
    window.location.href = `tel:${this.d.contact.phone}`;
  }
}
