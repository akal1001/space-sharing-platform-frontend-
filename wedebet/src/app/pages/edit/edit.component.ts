import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
import { HouseDataRequest } from '../../interfaces/house-data-request';

import { HouseDataService } from '../../services/houseData.service';
import { AccountService } from '../../services/account.service';
import { FormsModule, NgForm, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HouseDetail } from '../../interfaces/house-detail';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  apiKey: string = 'UnJ4QeZfY1dudOC0Tt2wMJmN8/2w1piw+boeqxc0sfey7ttrZtisq/ukAiX2lfTj';
  data!: HouseDetail;
  constructor(private dataService: DataService, private fileUploadService: FileUploadService, private houseDataService: HouseDataService, private accountService: AccountService) {

  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.dataService.geEditData$.subscribe((value) => {
      this.data = value;
      console.log("data for Eedit " + JSON.stringify(this.data));
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Simulate image upload and create URL
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          // this.data.images.push({ imageUrl: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove an image by index
  removeImage(index: number): void {
    this.data.images.splice(index, 1);
  }

  // Save action
  onSave(): void {
    console.log('Data saved:', this.data);
    alert('Property details saved successfully! this is just a test!');
  }
  selectedFiles: FileList | null = null;

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
    }
  }
  
  onUpload(): void {
    if (this.selectedFiles) {
      this.fileUploadService.uploadFiles(this.selectedFiles).subscribe({
        next: (response) => {
          console.log('Upload successful:', response);
          if(response.success==true){
            for(var i = 0; i < response.files.length; i ++){
              var imageUrl = response.files[i].fileUrl;
              var key = response.files[i]._Key;
              

              console.log(imageUrl);
              console.log(key);
            }
          }
          
        },
        error: (error) => {
          console.error('Error uploading files:', error);
        }
      });
    } else {
      console.error('No files selected.');
    }
  }
  
}

