import { Component } from '@angular/core';
import { DataService } from '../../DataServices/data.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  constructor(private dataService: DataService) {}

  onContactClick() {
    const contactData = 'This is contact data'; 
    this.dataService.setData(contactData);
  }

  isHomeChecked = true; // Default value for the "Home" checkbox

  userChecked(option: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`Option: ${option}, Checked: ${isChecked}`);
    // Add your custom logic here
  }
}
