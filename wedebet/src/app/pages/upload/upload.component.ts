import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm, FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormControl, Form } from '@angular/forms';


import { AccountService } from '../../services/account.service';
import { HouseDataRequest } from '../../interfaces/house-data-request';
import { HouseDataService } from '../../services/houseData.service';
import { Housetype } from '../../interfaces/housetype';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';
import { debounceTime, map, Observable, of, startWith } from 'rxjs';
import {SharedInputValidator} from '../../services/SharedInputValidator'

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, CommonModule],
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


  searchControl = new FormControl('');
   options: string[] = [
    'Afghanistan',
    'Algeria',
    'Albania',
    'Angola',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belize',
    'Belgium',
    'Bosnia and Herzegovina',
    'Brazil',
    'Bhutan',
    'Bulgaria',
    'Cambodia',
    'Canada',
    'China',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Czech Republic',
    'Denmark',
    'Dominica',
    'Egypt',
    'El Salvador',
    'Estonia',
    'Ethiopia',
    'Finland',
    'Fiji',
    'France',
    'Georgia',
    'Germany',
    'Ghana',
    'Grenada',
    'Guatemala',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Malaysia',
    'Maldives',
    'Mexico',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Morocco',
    'Myanmar',
    'Namibia',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Nigeria',
    'North Korea',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Senegal',
    'Serbia',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'The Gambia',
    'Trinidad and Tobago',
    'Turkey',
    'Turkmenistan',
    'Uganda',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uzbekistan',
    'Vanuatu',
    'Vietnam',
    'Zimbabwe'
  ];
  
  
  
  filteredOptions!: Observable<string[]>;





  constructor(public sharedInputValidator:SharedInputValidator, private http: HttpClient, private fileUploadService: FileUploadService, private router: Router, private houseDataService: HouseDataService, private accountService: AccountService) {
    this.houseTypes();
    const localDateTime = new Date().toLocaleString();
  }
  ngOnInit(): void {
   

   this.setupFilter();


    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit1(): void {
    this.submitted = true; // Set to true when the user submits
    // Other form submission logic here...
  }


  inputChangeCount = 0; // Counter to track input changes
  displayOptions = true; // Flag to control dropdown visibility


  private setupFilter() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''), // Initialize with an empty string
      debounceTime(200), // Add a short delay for performance
      map(value => this.filterOptions(value || '')) // Trigger filtering on every input change
    );
  }
   filterValue:any=[];

   private filterOptions(value: string): string[] {
    // Trim and lowercase the input for consistent matching
    this.filterValue = value.trim().toLowerCase();
  
    // Dynamically filter options based on the input
    return this.filterValue.length > 0
      ? this.options.filter(option => option.toLowerCase().startsWith(this.filterValue))
      : []; // Return an empty array if the input is empty
  }

  onOptionSelected(option: string): void {
    this.searchControl.setValue(option); // Set the selected value
    
    this.inputChangeCount = 0;
    this.displayOptions = false;

    // After a short delay, allow the dropdown to reappear on new input
    setTimeout(() => (this.displayOptions = true), 100); // Adjust delay as needed
    
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


  @ViewChild('propertyForm') propertyForm!: NgForm; // Use ViewChild to reference the form

  submitted = false;

 
  onSubmit() {
    this.submitted = true;
   
  
    if (this.propertyForm.valid && !this.hasExceededLimits() && !this.isUploading) {
    
      this.onUpload();
    } else {
      // Optionally, provide feedback if form is invalid
      console.log("Form is invalid");
    }
  }
  hasExceededLimits(): boolean {
    return Object.values(this.sharedInputValidator.exceededLimits).some((limitExceeded) => limitExceeded);
  }

  




  onUpload() {
    this._message = null;
    this._message = "uploading ..."
  
    
    this.houseDataService.uploadHouse(this.property).subscribe({
      next: (response) => {
        this._message = response.message;
        console.log(this._message)
        console.log(response.success)
        this.submitted = false;
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