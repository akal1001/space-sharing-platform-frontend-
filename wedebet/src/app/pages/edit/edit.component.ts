import { Component, ViewChild } from '@angular/core';
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
import { SharedInputValidator } from '../../services/SharedInputValidator';

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
  
  @ViewChild('propertyForm') propertyForm!: NgForm; // Use ViewChild to reference the form
  
    submitted = false;

  constructor(public sharedInputValidator:SharedInputValidator,private dataService: DataService, private s3Service: S3Service, private fileUploadService: FileUploadService, private houseDataService: HouseDataService, private accountService: AccountService) {

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

  hasExceededLimits(): boolean {
    return Object.values(this.sharedInputValidator.exceededLimits).some((limitExceeded) => limitExceeded);
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
    const lowerValue = value.toLowerCase();
    for (const key in this.countryMap) {
      if (this.countryMap[key].toLowerCase() === lowerValue) {
        return true;
      }
    }
    return false;
  }
  

  // countryMap: { [key: string]: string } = {
  //   "አፍጋኒስታን": "Afghanistan",
  //   "አልጀሪያ": "Algeria",
  //   "አልባኒያ": "Albania",
  //   "አንጎላ": "Angola",
  //   "አርጀንቲና": "Argentina",
  //   "አርሜኒያ": "Armenia",
  //   "አውስትሬሊያ": "Australia",
  //   "ኦስትሪያ": "Austria",
  //   "አዘርባይጃን": "Azerbaijan",
  //   "ባህሬን": "Bahrain",
  //   "ባንግላዲሽ": "Bangladesh",
  //   "ባርቤዶስ": "Barbados",
  //   "ቤላሩስ": "Belarus",
  //   "ቤሊዝ": "Belize",
  //   "ቤልጄም": "Belgium",
  //   "ቦስኒያ እና ሄርዘጎቪኒያ": "Bosnia and Herzegovina",
  //   "ብራዚል": "Brazil",
  //   "ቡታን": "Bhutan",
  //   "ቡልጋሪያ": "Bulgaria",
  //   "ካምቦዲያ": "Cambodia",
  //   "ካናዳ": "Canada",
  //   "ቻይና": "China",
  //   "ኮስታ ሪካ": "Costa Rica",
  //   "ክሮኤሽያ": "Croatia",
  //   "ኩባ": "Cuba",
  //   "ቼክ ሪፑብሊክ": "Czech Republic",
  //   "ዴንማርክ": "Denmark",
  //   "ዶሚኒካ": "Dominica",
  //   "ግብፅ": "Egypt",
  //   "ኤል ሳልቫዶር": "El Salvador",
  //   "ኤስቶኒያ": "Estonia",
  //   "ኢትዮጵያ": "Ethiopia",
  //   "ፊንላንድ": "Finland",
  //   "ፊጂ": "Fiji",
  //   "ፈረንሳይ": "France",
  //   "ጊዮርጂያ": "Georgia",
  //   "ጀርመን": "Germany",
  //   "ጋና": "Ghana",
  //   "ግሬናዳ": "Grenada",
  //   "ጉዋቲማላ": "Guatemala",
  //   "ሆንግ ኮንግ": "Hong Kong",
  //   "ሁንጋሪ": "Hungary",
  //   "አይስላንድ": "Iceland",
  //   "ህንድ": "India",
  //   "ኢንዶኔዢያ": "Indonesia",
  //   "ኢራን": "Iran",
  //   "ኢራቅ": "Iraq",
  //   "እስራኤል": "Israel",
  //   "ኢጣሊያ": "Italy",
  //   "ጃማይካ": "Jamaica",
  //   "ጃፓን": "Japan",
  //   "ጆርዳን": "Jordan",
  //   "ካዛኪስታን": "Kazakhstan",
  //   "ኬንያ": "Kenya",
  //   "ኪሪባቲ": "Kiribati",
  //   "ኮሶቮ": "Kosovo",
  //   "ኩዌት": "Kuwait",
  //   "ኪርጊስታን": "Kyrgyzstan",
  //   "ላኦስ": "Laos",
  //   "ላትቪያ": "Latvia",
  //   "ሊባኖስ": "Lebanon",
  //   "ሊክተንስታይን": "Liechtenstein",
  //   "ሊቱዌኒያ": "Lithuania",
  //   "ሉክሰምበርግ": "Luxembourg",
  //   "ማኬዶንያ": "Macedonia",
  //   "ማሌዥያ": "Malaysia",
  //   "ማልዲቭስ": "Maldives",
  //   "ሜክሲኮ": "Mexico",
  //   "ሞልዶቫ": "Moldova",
  //   "ሞናኮ": "Monaco",
  //   "ሞንጎሊያ": "Mongolia",
  //   "ሞሮኮ": "Morocco",
  //   "ማይናማር (በርማ)": "Myanmar (Burma)",
  //   "ናሚቢያ": "Namibia",
  //   "ኔፓል": "Nepal",
  //   "ኔዘርላንድ": "Netherlands",
  //   "ኒው ዚላንድ": "New Zealand",
  //   "ኒካራጓ": "Nicaragua",
  //   "ናይጄሪያ": "Nigeria",
  //   "ሰሜን ኮሪያ": "North Korea",
  //   "ኖርዌ": "Norway",
  //   "ኦማን": "Oman",
  //   "ፓኪስታን": "Pakistan",
  //   "ፓላው": "Palau",
  //   "ፓናማ": "Panama",
  //   "ፓፑዋ ኒው ጊኒ": "Papua New Guinea",
  //   "ፊሊፒንስ": "Philippines",
  //   "ፖላንድ": "Poland",
  //   "ፖርቱጋል": "Portugal",
  //   "ኳታር": "Qatar",
  //   "ሮሜኒያ": "Romania",
  //   "ሩሲያ": "Russia",
  //   "ሴንት ኪትስ እና ኔቪስ": "Saint Kitts and Nevis",
  //   "ሴንት ሉሺያ": "Saint Lucia",
  //   "ሴንት ቪንሴንት እና ግሬናዲንስ": "Saint Vincent and the Grenadines",
  //   "ሴኔጋል": "Senegal",
  //   "ሰርቢያ": "Serbia",
  //   "ሲንጋፖር": "Singapore",
  //   "ስሎቫኪያ": "Slovakia",
  //   "ስሎቬኒያ": "Slovenia",
  //   "ደቡብ አፍሪካ": "South Africa",
  //   "ደቡብ ኮሪያ": "South Korea",
  //   "ስፔን": "Spain",
  //   "ስሪ ላንካ": "Sri Lanka",
  //   "ሱዳን": "Sudan",
  //   "ስዊድን": "Sweden",
  //   "ስዊዘርላንድ": "Switzerland",
  //   "ሲሪያ": "Syria",
  //   "ታይዋን": "Taiwan",
  //   "ታጂኪስታን": "Tajikistan",
  //   "ታንዛኒያ": "Tanzania",
  //   "ታይላንድ": "Thailand",
  //   "ጋምቢያ": "The Gambia",
  //   "ትሪኒዳድ እና ቶባጎ": "Trinidad and Tobago",
  //   "ቱርኪ": "Turkey",
  //   "ቱርክሜኒስታን": "Turkmenistan",
  //   "ዩጋንዳ": "Uganda",
  //   "የአረብ ኤምሬት": "United Arab Emirates",
  //   "እንግሊዝ": "United Kingdom",
  //   "አሜሪካ": "United States",
  //   "ዩናትድ እስቴት": "United States",
  //   "ኡዝበኪስታን": "Uzbekistan",
  //   "ቫኑአቱ": "Vanuatu",
  //   "ቬትናም": "Vietnam",
  //   "ዚምቧቄ": "Zimbabwe"
  // };
  countryMap: { [key: string]: string } = {
    "አፍጋኒስታን": "afghanistan",
    "አልጀሪያ": "algeria",
    "አልባኒያ": "albania",
    "አንጎላ": "angola",
    "አርጀንቲና": "argentina",
    "አርሜኒያ": "armenia",
    "አውስትሬሊያ": "australia",
    "ኦስትሪያ": "austria",
    "አዘርባይጃን": "azerbaijan",
    "ባህሬን": "bahrain",
    "ባንግላዲሽ": "bangladesh",
    "ባርቤዶስ": "barbados",
    "ቤላሩስ": "belarus",
    "ቤሊዝ": "belize",
    "ቤልጄም": "belgium",
    "ቦስኒያ እና ሄርዘጎቪኒያ": "bosnia and herzegovina",
    "ብራዚል": "brazil",
    "ቡታን": "bhutan",
    "ቡልጋሪያ": "bulgaria",
    "ካምቦዲያ": "cambodia",
    "ካናዳ": "canada",
    "ቻይና": "china",
    "ኮስታ ሪካ": "costa rica",
    "ክሮኤሽያ": "croatia",
    "ኩባ": "cuba",
    "ቼክ ሪፑብሊክ": "czech republic",
    "ዴንማርክ": "denmark",
    "ዶሚኒካ": "dominica",
    "ግብፅ": "egypt",
    "ኤል ሳልቫዶር": "el salvador",
    "ኤስቶኒያ": "estonia",
    "ኢትዮጵያ": "ethiopia",
    "ፊንላንድ": "finland",
    "ፊጂ": "fiji",
    "ፈረንሳይ": "france",
    "ጊዮርጂያ": "georgia",
    "ጀርመን": "germany",
    "ጋና": "ghana",
    "ግሬናዳ": "grenada",
    "ጉዋቲማላ": "guatemala",
    "ሆንግ ኮንግ": "hong kong",
    "ሁንጋሪ": "hungary",
    "አይስላንድ": "iceland",
    "ህንድ": "india",
    "ኢንዶኔዢያ": "indonesia",
    "ኢራን": "iran",
    "ኢራቅ": "iraq",
    "እስራኤል": "israel",
    "ኢጣሊያ": "italy",
    "ጃማይካ": "jamaica",
    "ጃፓን": "japan",
    "ጆርዳን": "jordan",
    "ካዛኪስታን": "kazakhstan",
    "ኬንያ": "kenya",
    "ኪሪባቲ": "kiribati",
    "ኮሶቮ": "kosovo",
    "ኩዌት": "kuwait",
    "ኪርጊስታን": "kyrgyzstan",
    "ላኦስ": "laos",
    "ላትቪያ": "latvia",
    "ሊባኖስ": "lebanon",
    "ሊክተንስታይን": "liechtenstein",
    "ሊቱዌኒያ": "lithuania",
    "ሉክሰምበርግ": "luxembourg",
    "ማኬዶንያ": "macedonia",
    "ማሌዥያ": "malaysia",
    "ማልዲቭስ": "maldives",
    "ሜክሲኮ": "mexico",
    "ሞልዶቫ": "moldova",
    "ሞናኮ": "monaco",
    "ሞንጎሊያ": "mongolia",
    "ሞሮኮ": "morocco",
    "ማይናማር (በርማ)": "myanmar (burma)",
    "ናሚቢያ": "namibia",
    "ኔፓል": "nepal",
    "ኔዘርላንድ": "netherlands",
    "ኒው ዚላንድ": "new zealand",
    "ኒካራጓ": "nicaragua",
    "ናይጄሪያ": "nigeria",
    "ሰሜን ኮሪያ": "north korea",
    "ኖርዌ": "norway",
    "ኦማን": "oman",
    "ፓኪስታን": "pakistan",
    "ፓላው": "palau",
    "ፓናማ": "panama",
    "ፓፑዋ ኒው ጊኒ": "papua new guinea",
    "ፊሊፒንስ": "philippines",
    "ፖላንድ": "poland",
    "ፖርቱጋል": "portugal",
    "ኳታር": "qatar",
    "ሮሜኒያ": "romania",
    "ሩሲያ": "russia",
    "ሴንት ኪትስ እና ኔቪስ": "saint kitts and nevis",
    "ሴንት ሉሺያ": "saint lucia",
    "ሴንት ቪንሴንት እና ግሬናዲንስ": "saint vincent and the grenadines",
    "ሴኔጋል": "senegal",
    "ሰርቢያ": "serbia",
    "ሲንጋፖር": "singapore",
    "ስሎቫኪያ": "slovakia",
    "ስሎቬኒያ": "slovenia",
    "ደቡብ አፍሪካ": "south africa",
    "ደቡብ ኮሪያ": "south korea",
    "ስፔን": "spain",
    "ስሪ ላንካ": "sri lanka",
    "ሱዳን": "sudan",
    "ስዊድን": "sweden",
    "ስዊዘርላንድ": "switzerland",
    "ሲሪያ": "syria",
    "ታይዋን": "taiwan",
    "ታጂኪስታን": "tajikistan",
    "ታንዛኒያ": "tanzania",
    "ታይላንድ": "thailand",
    "ጋምቢያ": "the gambia",
    "ትሪኒዳድ እና ቶባጎ": "trinidad and tobago",
    "ቱርኪ": "turkey",
    "ቱርክሜኒስታን": "turkmenistan",
    "ዩጋንዳ": "uganda",
    "የአረብ ኤምሬት": "united arab emirates",
    "እንግሊዝ": "united kingdom",
    "አሜሪካ": "united states",
    "ዩናትድ እስቴት": "united states",
    "ኡዝበኪስታን": "uzbekistan",
    "ቫኑአቱ": "vanuatu",
    "ቬትናም": "vietnam",
    "ዚምቧቄ": "zimbabwe"
  };
  
  isSuccess:boolean = false;
  _message:any;
  // Save action
  updating:any;
  onSave(): void {
    
    console.log(this.data.address.country)
   
    if (this.propertyForm.valid && !this.hasExceededLimits() && !this.isUploading) {
      if (this.data.address?.country !== undefined) {
        const isAmharic = this.isAmharicString(this.data.address.country);
        const isEnglish = this.isEnglish(this.data.address?.country);
        console.log("is Ameharic"+ isAmharic)

        if (!isAmharic && !isEnglish) {
          //this.onUpload();
          console.log("not english or ameharic update requested")
          return;
        }
        // Proceed if it contains either Amharic or English
        if (isAmharic || isEnglish) {
          if (isAmharic) {
            const mapToEng = this.countryMap[this.data.address.country];
           
            if (mapToEng === undefined) {
              console.log("Invalid Amharic country name");
              this.isSuccess = false;
              this._message = "Invalid Amharic country name";
              return;
            } else {
              this.data.address.Country_Translated_English = mapToEng;
              console.log(this.data.address.Country_Translated_English)
            }
          } else if (isEnglish) {
            const exists = this.countryExistsByValue(this.data.address.country);
            if (!exists) {
              console.log("Invalid English country name");
              this.isSuccess = false;
              this._message = "Invalid English country name";
              return;
            } else {
              this.data.address.Country_Translated_English = this.data.address.country;
              
              console.log(this.data.address.Country_Translated_English)
            }
          }
        }
      }
    }
   
   
   
   
   
   
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
      ImageInfos: [],
      Country_Translated_English :this.data.address.Country_Translated_English
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
    this.uploadMessage = "Uploading ...";

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
              this.uploadMessage = "";
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

