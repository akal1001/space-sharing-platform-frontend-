import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';


import { AccountService } from '../../services/account.service';
import { HouseDataRequest } from '../../interfaces/house-data-request';
import { HouseDataService } from '../../services/houseData.service';
import { Housetype } from '../../interfaces/housetype';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {

  houseTypid: any = null;
  //uploadedurls: any[] = [];
  uploadStatus: string | null = null; // Added property
  //uploadMessage: string | null = null; // Added property

  _message: any;
  isSuccess: boolean = false;
  //isUploading: boolean = false;


  constructor(private http: HttpClient, private fileUploadService: FileUploadService, private router: Router, private houseDataService: HouseDataService, private accountService: AccountService) {
    this.houseTypes();
    const localDateTime = new Date().toLocaleString();
  }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  property: HouseDataRequest = {

    HouseTypeId: '',
    HouseId: '',
    HouseTypeName: '',
    Header: '',
    Description: '',
    Price: 0,
    DatePosted: new Date(),
    ContactId: '',
    Phone: '',
    Email: '',
    AddressId: '',
    Street: '',
    City: '',
    State: '',
    ZipCode: 0,
    PostalCode: '',
    Country: '',
    IsAddressPublic: false,
    DateUpdated: new Date(),
    ImageId: '',
    ImageName: '',
    Image: '',
    ImageInfos: [],
    DateUploaded: new Date()
  };

  submitted = false;


  onSubmit() {
    
    this.submitted = true;

    const phonePattern = /^\+?\d{10,13}$/; // Adjust regex as needed
    if (this.property.Phone && !phonePattern.test(this.property.Phone)) {
      this._message = 'Please enter a valid phone number.';
      // alert(this._message);

    }

    console.log(this.property);
    this.onUpload();

  }




  onUpload() {
    this._message = null;
    this._message = "uploading ..."
  
    
    this.houseDataService.uploadHouse(this.property).subscribe({
      next: (response) => {
        this._message = response.message;
        console.log(this._message)
        console.log(response.success)

        this.property = {
          HouseTypeId: '',
          HouseId: '',
          HouseTypeName: '',
          Header: '',
          Description: '',
          Price: 0,
          DatePosted: new Date(),
          ContactId: '',
          Phone: '',
          Email: '',
          AddressId: '',
          Street: '',
          City: '',
          State: '',
          ZipCode: 0,
          PostalCode: '',
          Country: '',
          IsAddressPublic: false,
          DateUpdated: new Date(),
          ImageId: '',
          ImageName: '',
          Image: '',
          ImageInfos: [],
          DateUploaded: new Date()
        }

        this.uploadedurls = [];

      },
      error: (error) => {
        this._message = error;
        console.log(this._message)
      }
    });
  }
  headerOptions: any = [{
    houseTypeId: '',
    houseTypeName: ''
  }];

  houseTypes() {
    this.houseDataService.houseTypes().subscribe({
      next: (data) => {
        this.headerOptions = data.data;
      }, error: () => { }, complete: () => {
        console.log(this.headerOptions)
      }
    })

  }






  selectedFiles: FileList | null = null;
  isUploading: boolean = false;
  uploadMessage: string = "";
  uploadedurls: any[] = [];

  onImageChange(event: Event): void {
    this.isUploading = true;  // Set the flag to true before starting the upload
    this.uploadMessage = "Uploading image...";  // Show the uploading message

    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
      this.UploadImageS3();
    }
  }

  UploadImageS3(): void {
    if (this.selectedFiles) {
      this.fileUploadService.uploadFiles(this.selectedFiles).subscribe({
        next: (response) => {
          console.log('Upload successful:', response);

          // Process each uploaded file and store its URL
          for (let i = 0; i < response.files.length; i++) {
            const imageUrl = response.files[i].fileUrl;
            const key = response.files[i]._Key;

            let imgFil = { "_key": key, "url": imageUrl };
            this.uploadedurls.push(imgFil);

            
            this.property.ImageInfos = this.uploadedurls;

            console.log("Image Infos: ", this.property.ImageInfos);

            // If it's the last file, set the uploading flag to false
            if (i === response.files.length - 1) {
              this.isUploading = false;  // Set the flag to false after the last file is uploaded
            }
          }
        },
        error: (error) => {
          console.error('Error uploading files:', error);
          this.isUploading = false; // Ensure flag is reset on error
        },
      });
    } else {
      console.error('No files selected.');
      this.isUploading = false; // Reset flag when no files are selected
    }
  }

}