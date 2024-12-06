import { Component, OnInit } from '@angular/core';
import { DataService } from '../../DataServices/data.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  dataDetail: any;
  constructor(private dataService: DataService) {

  }
  ngOnInit(): void {
    this.dataService.data$.subscribe(data => {
      this.dataDetail = data;

      console.log("search result : " + this.dataDetail)
    })
  }
}
