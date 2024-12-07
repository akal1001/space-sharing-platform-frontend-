import { Component } from '@angular/core';
import {FormsModule,FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  property = {
    header: '',  // Bind this to the dropdown
    price: null,
    image: null,
    address: '',
    city: '',
    phone: '',
    description: ''
  };

  // Dummy options for the dropdown
  headerOptions = [
    'Apartment - 2 Bedroom, 1 Bath',
    'House - 3 Bedroom, 2 Bath',
    'Condo - Studio, 1 Bath',
    'Townhouse - 2 Bedroom, 2 Bath',
    'Studio - 1 Bedroom, 1 Bath',
    'Penthouse - 4 Bedroom, 3 Bath',
    'Villa - 5 Bedroom, 4 Bath',
    'Loft - 1 Bedroom, 1 Bath',
    'Cottage - 2 Bedroom, 1 Bath'
  ];

  onSubmit() {
    console.log(this.property);
    // Handle the form submission logic
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.property.image = file;
    }
  }
}