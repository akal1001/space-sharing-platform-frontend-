import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule,FormBuilder,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FileuploaderService } from '../../services/fileuploader.service';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf,NgFor],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  uploadedurls: any[] = [];
  uploadStatus: string | null = null; // Added property
  uploadMessage: string | null = null; // Added property

  constructor(private http: HttpClient, private fileUploadService:FileuploaderService) {}

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
    // Loop through all selected files
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      if (file) {
        this.property.image = file;  
        
      }
  
      // Call the upload service for each file
      this.fileUploadService.uploadFile(file).then(img => {
        console.log("result : " + img.fileUrl);
        console.log("result : " + img.status);
        console.log("result : " + img.message);
  
        // Update the message, status, and uploaded URL for each file
        this.uploadMessage = img.message;
        this.uploadStatus = img.status;
        
        this.uploadedurls.push(img.fileUrl)
      });
    }
  }
}