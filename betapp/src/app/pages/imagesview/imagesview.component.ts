import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';

@Component({
  selector: 'app-imagesview',
  templateUrl: './imagesview.component.html',
  styleUrls: ['./imagesview.component.css']
})
export class ImagesviewComponent implements OnInit {
  images: any;
  id:any;
  
  constructor(private storeae: LoaclstoarageService, private homeservece: HomeService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

    this.id=this._Activatedroute.snapshot.paramMap.get("id");
   
    //this. GetAllImage();
    this.homeservece.GetHouseImages(this.id).subscribe((resposne) => 
    {

      this.images = resposne;
  
    });
  }

 
}
