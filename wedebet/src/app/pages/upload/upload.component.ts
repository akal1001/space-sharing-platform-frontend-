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
import { SharedInputValidator } from '../../Classes/SharedInputValidator'

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
 sharedInputValidator: SharedInputValidator;

  searchControl = new FormControl('');
  options: string[] = [
    'Afghanistan',
    'United States',
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
    
    'Uzbekistan',
    'Vanuatu',
    'Vietnam',
    'Zimbabwe',
    'አሜሪካ',
    'ዩናትድ እስቴት',
    'አፍጋኒስታን',
    'አልጀሪያ',
    'አልባኒያ',
    'አንጎላ',
    'አርጀንቲና',
    'አርሜኒያ',
    'አውስትሬሊያ',
    'ኦስትሪያ',
    'አዘርባይጃን',
    'ባህሬን',
    'ባንግላዲሽ',
    'ባርቤዶስ',
    'ቤላሩስ',
    'ቤሊዝ',
    'ቤልጄም',
    'ቦስኒያ እና ሄርዘጎቪኒያ',
    'ብራዚል',
    'ቡታን',
    'ቡልጋሪያ',
    'ካምቦዲያ',
    'ካናዳ',
    'ቻይና',
    'ኮስታ ሪካ',
    'ክሮኤሽያ',
    'ኩባ',
    'ቼክ ሪፑብሊክ',
    'ዴንማርክ',
    'ዶሚኒካ',
    'ግብፅ',
    'ኤል ሳልቫዶር',
    'ኤስቶኒያ',
    'ኢትዮጵያ',
    'ፊንላንድ',
    'ፊጂ',
    'ፈረንሳይ',
    'ጊዮርጂያ',
    'ጀርመን',
    'ጋና',
    'ግሬናዳ',
    'ጉዋቲማላ',
    'ሆንግ ኮንግ',
    'ሁንጋሪ',
    'አይስላንድ',
    'ህንድ',
    'ኢንዶኔዢያ',
    'ኢራን',
    'ኢራቅ',
    'እስራኤል',
    'ኢጣሊያ',
    'ጃማይካ',
    'ጃፓን',
    'ጆርዳን',
    'ካዛኪስታን',
    'ኬንያ',
    'ኪሪባቲ',
    'ኮሶቮ',
    'ኩዌት',
    'ኪርጊስታን',
    'ላኦስ',
    'ላትቪያ',
    'ሊባኖስ',
    'ሊክተንስታይን',
    'ሊቱዌኒያ',
    'ሉክሰምበርግ',
    'ማኬዶንያ',
    'ማሌዥያ',
    'ማልዲቭስ',
    'ሜክሲኮ',
    'ሞልዶቫ',
    'ሞናኮ',
    'ሞንጎሊያ',
    'ሞሮኮ',
    'ማይናማር (በርማ)',
    'ናሚቢያ',
    'ኔፓል',
    'ኔዘርላንድ',
    'ኒው ዚላንድ',
    'ኒካራጓ',
    'ናይጄሪያ',
    'ሰሜን ኮሪያ',
    'ኖርዌ',
    'ኦማን',
    'ፓኪስታን',
    'ፓላው',
    'ፓናማ',
    'ፓፑዋ ኒው ጊኒ',
    'ፊሊፒንስ',
    'ፖላንድ',
    'ፖርቱጋል',
    'ኳታር',
    'ሮሜኒያ',
    'ሩሲያ',
    'ሴንት ኪትስ እና ኔቪስ',
    'ሴንት ሉሺያ',
    'ሴንት ቪንሴንት እና ግሬናዲንስ',
    'ሴኔጋል',
    'ሰርቢያ',
    'ሲንጋፖር',
    'ስሎቫኪያ',
    'ስሎቬኒያ',
    'ደቡብ አፍሪካ',
    'ደቡብ ኮሪያ',
    'ስፔን',
    'ስሪ ላንካ',
    'ሱዳን',
    'ስዊድን',
    'ስዊዘርላንድ',
    'ሲሪያ',
    'ታይዋን',
    'ታጂኪስታን',
    'ታንዛኒያ',
    'ታይላንድ',
    'ጋምቢያ',
    'ትሪኒዳድ እና ቶባጎ',
    'ቱርኪ',
    'ቱርክሜኒስታን',
    'ዩጋንዳ',
    'የአረብ ኤምሬት',
    'እንግሊዝ',
    'ኡዝበኪስታን',
    'ቫኑአቱ',
    'ቬትናም',
    'ዚምቧቄ'
  ];

  countryMap: { [key: string]: string } = {
    "አፍጋኒስታን": "Afghanistan",
    "አልጀሪያ": "Algeria",
    "አልባኒያ": "Albania",
    "አንጎላ": "Angola",
    "አርጀንቲና": "Argentina",
    "አርሜኒያ": "Armenia",
    "አውስትሬሊያ": "Australia",
    "ኦስትሪያ": "Austria",
    "አዘርባይጃን": "Azerbaijan",
    "ባህሬን": "Bahrain",
    "ባንግላዲሽ": "Bangladesh",
    "ባርቤዶስ": "Barbados",
    "ቤላሩስ": "Belarus",
    "ቤሊዝ": "Belize",
    "ቤልጄም": "Belgium",
    "ቦስኒያ እና ሄርዘጎቪኒያ": "Bosnia and Herzegovina",
    "ብራዚል": "Brazil",
    "ቡታን": "Bhutan",
    "ቡልጋሪያ": "Bulgaria",
    "ካምቦዲያ": "Cambodia",
    "ካናዳ": "Canada",
    "ቻይና": "China",
    "ኮስታ ሪካ": "Costa Rica",
    "ክሮኤሽያ": "Croatia",
    "ኩባ": "Cuba",
    "ቼክ ሪፑብሊክ": "Czech Republic",
    "ዴንማርክ": "Denmark",
    "ዶሚኒካ": "Dominica",
    "ግብፅ": "Egypt",
    "ኤል ሳልቫዶር": "El Salvador",
    "ኤስቶኒያ": "Estonia",
    "ኢትዮጵያ": "Ethiopia",
    "ፊንላንድ": "Finland",
    "ፊጂ": "Fiji",
    "ፈረንሳይ": "France",
    "ጊዮርጂያ": "Georgia",
    "ጀርመን": "Germany",
    "ጋና": "Ghana",
    "ግሬናዳ": "Grenada",
    "ጉዋቲማላ": "Guatemala",
    "ሆንግ ኮንግ": "Hong Kong",
    "ሁንጋሪ": "Hungary",
    "አይስላንድ": "Iceland",
    "ህንድ": "India",
    "ኢንዶኔዢያ": "Indonesia",
    "ኢራን": "Iran",
    "ኢራቅ": "Iraq",
    "እስራኤል": "Israel",
    "ኢጣሊያ": "Italy",
    "ጃማይካ": "Jamaica",
    "ጃፓን": "Japan",
    "ጆርዳን": "Jordan",
    "ካዛኪስታን": "Kazakhstan",
    "ኬንያ": "Kenya",
    "ኪሪባቲ": "Kiribati",
    "ኮሶቮ": "Kosovo",
    "ኩዌት": "Kuwait",
    "ኪርጊስታን": "Kyrgyzstan",
    "ላኦስ": "Laos",
    "ላትቪያ": "Latvia",
    "ሊባኖስ": "Lebanon",
    "ሊክተንስታይን": "Liechtenstein",
    "ሊቱዌኒያ": "Lithuania",
    "ሉክሰምበርግ": "Luxembourg",
    "ማኬዶንያ": "Macedonia",
    "ማሌዥያ": "Malaysia",
    "ማልዲቭስ": "Maldives",
    "ሜክሲኮ": "Mexico",
    "ሞልዶቫ": "Moldova",
    "ሞናኮ": "Monaco",
    "ሞንጎሊያ": "Mongolia",
    "ሞሮኮ": "Morocco",
    "ማይናማር (በርማ)": "Myanmar (Burma)",
    "ናሚቢያ": "Namibia",
    "ኔፓል": "Nepal",
    "ኔዘርላንድ": "Netherlands",
    "ኒው ዚላንድ": "New Zealand",
    "ኒካራጓ": "Nicaragua",
    "ናይጄሪያ": "Nigeria",
    "ሰሜን ኮሪያ": "North Korea",
    "ኖርዌ": "Norway",
    "ኦማን": "Oman",
    "ፓኪስታን": "Pakistan",
    "ፓላው": "Palau",
    "ፓናማ": "Panama",
    "ፓፑዋ ኒው ጊኒ": "Papua New Guinea",
    "ፊሊፒንስ": "Philippines",
    "ፖላንድ": "Poland",
    "ፖርቱጋል": "Portugal",
    "ኳታር": "Qatar",
    "ሮሜኒያ": "Romania",
    "ሩሲያ": "Russia",
    "ሴንት ኪትስ እና ኔቪስ": "Saint Kitts and Nevis",
    "ሴንት ሉሺያ": "Saint Lucia",
    "ሴንት ቪንሴንት እና ግሬናዲንስ": "Saint Vincent and the Grenadines",
    "ሴኔጋል": "Senegal",
    "ሰርቢያ": "Serbia",
    "ሲንጋፖር": "Singapore",
    "ስሎቫኪያ": "Slovakia",
    "ስሎቬኒያ": "Slovenia",
    "ደቡብ አፍሪካ": "South Africa",
    "ደቡብ ኮሪያ": "South Korea",
    "ስፔን": "Spain",
    "ስሪ ላንካ": "Sri Lanka",
    "ሱዳን": "Sudan",
    "ስዊድን": "Sweden",
    "ስዊዘርላንድ": "Switzerland",
    "ሲሪያ": "Syria",
    "ታይዋን": "Taiwan",
    "ታጂኪስታን": "Tajikistan",
    "ታንዛኒያ": "Tanzania",
    "ታይላንድ": "Thailand",
    "ጋምቢያ": "The Gambia",
    "ትሪኒዳድ እና ቶባጎ": "Trinidad and Tobago",
    "ቱርኪ": "Turkey",
    "ቱርክሜኒስታን": "Turkmenistan",
    "ዩጋንዳ": "Uganda",
    "የአረብ ኤምሬት": "United Arab Emirates",
    "እንግሊዝ": "United Kingdom",
    "አሜሪካ": "United States",
    "ዩናትድ እስቴት": "United States",
    "ኡዝበኪስታን": "Uzbekistan",
    "ቫኑአቱ": "Vanuatu",
    "ቬትናም": "Vietnam",
    "ዚምቧቄ": "Zimbabwe"
  };



  filteredOptions!: Observable<string[]>;





  constructor(private http: HttpClient, private fileUploadService: FileUploadService, private router: Router, private houseDataService: HouseDataService, private accountService: AccountService) {
   
    this.sharedInputValidator = new SharedInputValidator();
   
    this.houseTypes();
    const localDateTime = new Date().toLocaleString();
  }
  ngOnInit(): void {


    this.setupFilter();
    this.setupHeaderFilter();


    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit1(): void {
    this.submitted = true; // Set to true when the user submits
    // Other form submission logic here...
  }


  inputChangeCount = 0; // Counter to track input changes
  displayOptions = true; // Flag to control dropdown visibility
  headerdisplayOptions = true;

  private setupFilter() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''), // Initialize with an empty string
      debounceTime(200), // Add a short delay for performance
      map(value => this.filterOptions(value || '')) // Trigger filtering on every input change
    );
  }
  filterValue: any = [];

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
    Price: null,
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
    DateUploaded: new Date(),
    Country_Translated_English: ''
  };


  @ViewChild('propertyForm') propertyForm!: NgForm; // Use ViewChild to reference the form

  submitted = false;


  onSubmit() {
    this.submitted = true;
    if (this.propertyForm.valid && !this.hasExceededLimits() && !this.isUploading) {
      if (this.property.Country !== undefined) {
        const isAmharic = this.isAmharicString(this.property.Country);
        const isEnglish = this.isEnglish(this.property.Country);

        if (!isAmharic && !isEnglish) {
          this.onUpload();
          return;
        }
        // Proceed if it contains either Amharic or English
        if (isAmharic || isEnglish) {
          if (isAmharic) {
            const mapToEng = this.countryMap[this.property.Country];
            if (mapToEng === undefined) {
              alert("Invalid Amharic country name");
              this.isSuccess = false;
              this._message = "Invalid Amharic country name";
              return;
            } else {
              this.property.Country_Translated_English = mapToEng;
            }
          } else if (isEnglish) {
            const exists = this.countryExistsByValue(this.property.Country);
            if (!exists) {
              alert("Invalid English country name");
              this.isSuccess = false;
              this._message = "Invalid English country name";
              return;
            } else {
              this.property.Country_Translated_English = this.property.Country;
            }
          }

          this.onUpload();
          return;
        } else {
          this.isSuccess = false;
          this._message = "Country name must be in Amharic or English.";
        }
      }
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
        this.isSuccess = response.success;
        this._message = response.message;
        console.log(this._message)
        console.log(response.success)
        this.submitted = false;
        if (this.isSuccess) {
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
            DateUploaded: new Date(),
            Country_Translated_English: ''
          }
          this.uploadedurls = [];
        }




      },
      error: (error) => {
        this._message = error;
        console.log(this._message)
      }
    });
  }
  // headerOptions: any = [{
  //   houseTypeId: '',
  //   houseTypeName: ''
  // }];

  // headerOptions1: any[] = [];
  // headerFilteredOptions!: Observable<any[]>;
  // headerFilterValue: string = '';

  // headerSrchControl: FormControl = new FormControl('');

  houseTypes() {
    this.houseDataService.houseTypes().subscribe({
      next: (data) => {
        this.headerOptions = data.data;
        this.setupHeaderFilter(); // Call after data is loaded
      },
      error: () => { },
      complete: () => {
        console.log(this.headerOptions);
      }
    });
  }

  headerOptions: { houseTypeId: string; houseTypeName: string }[] = [];
  headerFilteredOptions!: Observable<{ houseTypeId: string; houseTypeName: string }[]>;
  //displayOptions: boolean = false;

  headerSrchControl: FormControl = new FormControl('');

  private setupHeaderFilter() {
    this.headerFilteredOptions = this.headerSrchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      map(value => this.filterHeaderOptions(value || ''))
    );
  }

  private filterHeaderOptions(value: string) {
    const filterValue = value.toLowerCase().trim();
    return filterValue.length > 0
      ? this.headerOptions.filter((option: { houseTypeName: string }) =>
        option.houseTypeName.toLowerCase().startsWith(filterValue)
      )
      : [];
  }


  onHeaderOptionSelected(option: any) {
    this.property.HouseTypeName = option.houseTypeName;
    this.property.HouseTypeId = option.houseTypeId;
    this.headerSrchControl.setValue(option.houseTypeName);
    this.headerdisplayOptions = false;
  }





  isAmharicString(text: string): boolean {
    for (const char of text) {
      const code = char.charCodeAt(0);
      const isAmharicChar =
        (code >= 0x1200 && code <= 0x137F) || // Ethiopic
        (code >= 0x1380 && code <= 0x139F) || // Ethiopic Supplement
        (code >= 0x2D80 && code <= 0x2DDF);   // Ethiopic Extended

      if (!isAmharicChar) return false;
    }
    return true;
  }

  isEnglish(text: string): boolean {
    for (const character of text) {
      const code = character.charCodeAt(0);
      if (
        (code >= 0x0041 && code <= 0x005A) || // A-Z
        (code >= 0x0061 && code <= 0x007A)    // a-z
      ) {
        return true;
      }
    }
    return false;
  }
  getCountryKeyByValue(value: string): string | undefined {
    for (const key in this.countryMap) {
      if (this.countryMap[key] === value) {
        return key;
      }
    }
    return undefined; // return undefined if not found
  }
  countryExistsByValue(value: string): boolean {
    for (const key in this.countryMap) {
      if (this.countryMap[key] === value) {
        return true;
      }
    }
    return false;
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
          for (let i = 0; i < response.data.length; i++) {
            const imageUrl = response.data[i].fileUrl;
            const key = response.data[i]._Key;

            let imgFil = { "_key": key, "url": imageUrl };
            this.uploadedurls.push(imgFil);


            this.property.ImageInfos = this.uploadedurls;

            console.log("Image Infos: ", this.property.ImageInfos);

            // If it's the last file, set the uploading flag to false
            if (i === response.data.length - 1) {
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