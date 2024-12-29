import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm,FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { S3Service } from '../../services/s3.service';

import { AccountService } from '../../services/account.service';
import { HouseDataRequest } from '../../interfaces/house-data-request';
import { HouseDataService } from '../../services/houseData.service';
import { Housetype } from '../../interfaces/housetype';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
 
  houseTypid:any = null;
  uploadedurls: any[] = [];
  uploadStatus: string | null = null; // Added property
  uploadMessage: string | null = null; // Added property

  _message: any;
  isSuccess: boolean = false;
  isUploading: boolean = false;


  constructor(private http: HttpClient, private router:Router, private houseDataService: HouseDataService, private s3Service: S3Service, private accountService: AccountService) { 
    this.houseTypes();
    const localDateTime = new Date().toLocaleString();
  }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  property: HouseDataRequest = {
  
    HouseTypeId: '',
    HouseId: '',
    HouseTypeName:'',
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
    ImageUrls: [],
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

  onImageChange(event: any) {
    this.isUploading = true;  // Set the flag to true before starting the upload
    this.uploadMessage = "Uploading image...";  // Show the uploading message
  
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
  
      if (file) {
        this.property.Image = file;
      }
      
  
      // Upload the image file
      this.s3Service.uploadFile(file).then(img => {
        console.log("result : " + img.fileUrl);
        console.log("result : " + img.status);
        console.log("result : " + img.message);
  
        this.uploadMessage = img.message; // Show the message from the upload service
        this.uploadStatus = img.status;  // Set the upload status (success or error)
  
        // Store the uploaded file URLs
        this.uploadedurls.push(img.fileUrl);
  
        // Update the property ImageUrls after all files are uploaded
        this.property.ImageUrls = this.uploadedurls;
  
        // After all files are uploaded, set uploading to false
        if (i === event.target.files.length - 1) {
          this.isUploading = false;  // Set the flag to false after the last file is uploaded
        }
      }).catch(error => {
        console.error("Upload error:", error);
        this.uploadMessage = "Upload failed!";
        this.uploadStatus = "error";  // Set the status to error if the upload fails
  
        // Set uploading to false if there's an error
        this.isUploading = false;
      });
    }
  }
  

  onUpload() {
    this._message = null;
    this._message = "uploading ..."

    this.accountService.ReturnUserDataFromLocalStorage().subscribe({
      next: (info) => {
        if (info?.token) {
          // Now, proceed with the upload request
          this.houseDataService.uploadHouse(this.property, info.token).subscribe({
            next: (response) =>
           {
              this._message = response.message;
              console.log(this._message)
              console.log(response.success)

              this.property={ 
                HouseTypeId: '',
                HouseId: '',
                HouseTypeName:'',
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
                ImageUrls: [],
                DateUploaded: new Date()}

                this.uploadedurls = [];
             
            },
            error: (error) => {
              this._message = error;
              console.log(this._message)
            }
          });
        } else {
          // Handle case where token is not available
          this._message.error('Token is missing, please log in again');
          console.log(this._message)
        }
      },
      error: (error) => {
        this._message= error
      },
      complete: () => {
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
}