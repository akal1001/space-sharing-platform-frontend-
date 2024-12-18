import { Component } from '@angular/core';
import { DataService } from '../../DataServices/data.service';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(private dataService: DataService) {}

  data:any;
  ngOnInit() {
   
  }



  onContactClick() {
    const contactData = 'This is contact data'; 
    this.dataService.setData(contactData);
  }

  isHomeChecked = false; // Default value for the "Home" checkbox

  userChecked(option: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`Option: ${option}, Checked: ${isChecked}`);
    // Add your custom logic here
  }
}
