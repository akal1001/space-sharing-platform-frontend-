import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';

@Component({
  selector: 'app-imagesview',
  templateUrl: './imagesview.component.html',
  styleUrls: ['./imagesview.component.css']
})
export class ImagesviewComponent implements OnInit {
  images: any;
  constructor(private storeae: LoaclstoarageService, private homeservece: HomeService) { }

  ngOnInit(): void {
    this. GetAllImage();
  }

  GetAllImage() {
    let id = this.storeae.GetData("imgrefids");

    this.homeservece.GetHouseImages(id).subscribe((resposne) => 
    {

      this.images = resposne;
  
    });
  }

}
