import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { S3Service } from '../../services/s3.service';
import { UploadService } from '../../services/upload.service';
import { AccountService } from '../../services/account.service';
import { HouseDataRequest } from '../../interfaces/house-data-request';
import { HouseDataService } from '../../services/house-data.service';
import { Housetype } from '../../interfaces/housetype';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent  {

  uploadedurls: any[] = [];
  uploadStatus: string | null = null; // Added property
  uploadMessage: string | null = null; // Added property

  _message: any;
  isSuccess: boolean = false;

  constructor(private http: HttpClient, private houseDataService: HouseDataService, private s3Service: S3Service, private uploadService: UploadService, private accountService: AccountService) { 
    this.houseTypes();
    const localDateTime = new Date().toLocaleString();
  }
  
  property: HouseDataRequest = {
    HouseTypeId: '',
    HouseId: '',
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

 


  onSubmit() {
    console.log(this.property);
    this.onUpload();
  }

  onImageChange(event: any) {

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      if (file) {
        this.property.Image = file;

      }


      this.s3Service.uploadFile(file).then(img => {
        console.log("result : " + img.fileUrl);
        console.log("result : " + img.status);
        console.log("result : " + img.message);


        this.uploadMessage = img.message;
        this.uploadStatus = img.status;

        this.uploadedurls.push(img.fileUrl)
       
      });
    }
    this.property.ImageUrls = this.uploadedurls;
  }

  onUpload() {
    this._message = null;
    this.accountService.ReturnUserDataFromLocalStorage().subscribe({
      next: (info) => {
        if (info?.token) {

          // Now, proceed with the upload request
          this.uploadService.uploadHouse(this.property, info.token).subscribe({
            next: (response) => {
              if (response.success) {
                this._message.success('House uploaded successfully');
              } else {
                this._message.error('Upload failed: ' + response.message);
              }
            },
            error: (error) => {
              this._message.error('An error occurred during upload');
              console.error('Upload error:', error);
            }
          });
        } else {
          // Handle case where token is not available
          this._message.error('Token is missing, please log in again');
        }
      },
      error: () => {
        // Handle any error in fetching user data from localStorage
        this._message.error('Failed to retrieve user data');
      },
      complete: () => {
        // Handle completion if needed
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