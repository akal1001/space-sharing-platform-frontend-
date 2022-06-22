import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  continue()
  {
    this.router.navigateByUrl("/fileuploader")
  }
}
