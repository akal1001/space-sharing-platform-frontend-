
import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../DataServices/data.service';


@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {
  @Input() results: string[] = [];

  constructor(private router: Router, private data: DataService) {

  }
  onResultSelected(result: string) {
    console.log('Selected result:', result);
    this.data.setData(result);
    this.router.navigate(['/detail']);
  }
}
