import { Component, OnInit } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { HouseDataService } from '../../services/house-data.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  houeeDetail: any;
    // Placeholder for house data
  constructor(private dataService: DataService, private housedataserveice:HouseDataService) {

  }
  ngOnInit(): void {
    this.dataService.data$.subscribe(housId => {
      this.housedataserveice.houseDetail(housId).subscribe(data => {
        this.houeeDetail = data.data;
        console.log(this.houeeDetail);
      });
    })
  }
}
