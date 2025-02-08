import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DataService } from '../../DataServices/data.service';
import { HouseDataRequest } from '../../interfaces/house-data-request';

import { HouseDataService } from '../../services/houseData.service';
import { AccountService } from '../../services/account.service';
import { FormsModule, NgForm, FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { HouseDetail } from '../../interfaces/house-detail';
import { FileUploadService } from '../../services/file-upload.service';
import { S3Service } from '../../services/s3.service';
import { Image } from '../../interfaces/image';

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
  
  selectedFiles: FileList | null = null;
  isUploading: boolean = false;
  uploadMessage: string = "";
  images: Image[] = [];

  constructor(private dataService: DataService, private s3Service: S3Service, private fileUploadService: FileUploadService, private houseDataService: HouseDataService, private accountService: AccountService) {

  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.dataService.geEditData$.subscribe((value) => {
      this.data = value;
      console.log("data for Eedit " + JSON.stringify(this.data));
    });
  }
  // Remove an image by index
  deleteImage(key: string, imgId: string, index: number): void {
    console.log(`Attempting to delete image with key: ${key}`);

    // Optimistically remove the image from the local array
    const removedImage = this.data.images.splice(index, 1)[0];

    this.s3Service.DeleteImageFromS3(key, imgId).subscribe({
      next: (response) => {
        console.log('Image successfully deleted from S3:', response);
      },
      error: (err) => {
        console.error('Error deleting image from S3:', err.message);

        // Rollback local deletion if server deletion fails
        if (removedImage) {
          this.data.images.splice(index, 0, removedImage);
        }
      },
    });
  }

  // Save action
  updating:any;
  onSave(): void {
    this.updating = "updating..."
    console.log(this.updating)
    if (this.images.length > 0) {
      this.houseDataService.AddImages(this.images).subscribe({
        next: (response) => {
         
        }, error(err) {
          console.log(err.error)
        },
      })
    }

    console.log("Update data request : " + JSON.stringify(this.data))

    const housedataRequst: HouseDataRequest = {
      HouseTypeId: this.data.house.houseTypeId,
      HouseTypeName: this.data.house.header,
      HouseId: this.data.house.houseId,
      Header: this.data.house.header,
      Description: this.data.house.description,
      Price: this.data.house.price,
      ContactId: this.data.contact.contactId,
      Phone: this.data.contact.phone?.toString(),
      Email: '',
      AddressId: this.data.address.addressId,
      Street: this.data.address.street,
      City: this.data.address.city,
      State:this.data.address.state,
      ZipCode: 0,
      PostalCode: '',
      Country: this.data.address.country,
      IsAddressPublic: false,
      ImageId: '',
      ImageName: '',
      Image: '',
      ImageInfos: []
    }
 


    this.houseDataService.updateHouse(housedataRequst).subscribe({
      next: (response) => {
        console.log(response);
        
        if(response.success){
          this.updating = "updated successfully";
          console.log(this.updating)
         }
      }, error(err) {

      },
    })

  }

  onImageChange(event: Event): void {
    this.isUploading = true;
    this.uploadMessage = "Uploading image...";

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

            const newImage: Image = {
              imageId: '',
              imageName: "",
              houseId: this.data.house.houseId,
              imageUrl: imageUrl,
              dateUploaded: new Date(),
              _key: key
            }

            this.images.push(newImage);

            if (i === response.files.length - 1) {
              this.isUploading = false;
            }
          }
        },
        error: (error) => {
          console.error('Error uploading files:', error);
          this.isUploading = false;
        },
      });
    } else {
      console.error('No files selected.');
      this.isUploading = false;
    }
  }
}

