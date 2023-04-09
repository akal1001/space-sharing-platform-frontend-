import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';
import { HouseImage, uploadContent } from 'src/app/interfaces/uploadContent';
import { FileuploaderService } from 'src/app/services/fileuploader.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { HomeService } from 'src/app/services/home.service';
import { FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';
import { AmeharicService } from 'src/app/services/ameharic.service';


interface Title {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {


  uploadresponse: any;
  prompt: any;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  myInputValue!: string;
  mydata: any;
  files: File[] = [];
  reader = new FileReader();
  content: uploadContent = new uploadContent();
  imageurls: HouseImage[] = new Array();

  imagfordsiplay: string[] = [];
  selectvalue: any;
  selectvalue2: any;
  selectvaluePrompt: any;


  iconimage: any = "https://sm-image-bucket.s3.amazonaws.com/zh3ECH6qg3byimageIcon.png"

  title: Title[] = [

    { value: '1', viewValue: 'የሚከራይ ሙሉ ቤት' },
    { value: '2', viewValue: 'የሚከራይ 1 ክፍል' },
    { value: '3', viewValue: 'የሚከራይ 2 ክፍል' },
    { value: '4', viewValue: 'የሚከራይ 3 ክፍል' },
    { value: '5', viewValue: 'የሚከራይ ምድር ቤት' }
  ];

  status: any = "200";

  timbimageurl: any = null;

  imagepath: any = "https://putbucketde-demo1.s3.amazonaws.com/bPITFSl2C0zFimageIcon.png"
  fileselected: any = null;
  _img: any;
  base64String: any;
  newimage: any;

  myprompt: any;


  constructor(private validator: ValidatorService, private ameharicService:AmeharicService, private storage: LoaclstoarageService, private houseService: HomeService, private elementRef: ElementRef, private fileuploadService: FileuploaderService, private renderer: Renderer2, private breakpointObserver: BreakpointObserver) {

    // this.isMobile = breakpointObserver.isMatched('(max-width: 767px)');
    // this.isTablet = breakpointObserver.isMatched('(min-width: 768px) and (max-width: 1023px)');
    // this.isDesktop = breakpointObserver.isMatched('(min-width: 1024px)');

    this.isMobile = breakpointObserver.isMatched('(max-width: 567px)');
    this.isTablet = breakpointObserver.isMatched('(min-width: 568px) and (max-width: 1023px)');
    this.isDesktop = breakpointObserver.isMatched('(min-width: 1024px)');



  }

  ngOnInit(): void {

    // this.imageurls = [{ id: "1", imageUrl: "https://putbucketde-demo1.s3.amazonaws.com/HbqjDq1aiSbr1ED76BEA-9ACD-42F8-B73E-9AE34D89CE6A.jpeg" }, 
    // { id: "2", imageUrl: "https://putbucketde-demo1.s3.amazonaws.com/tyikvWPxcjqS7C26DD21-2D0C-4195-A44F-984F7DBB293E.jpeg" },
    // { id: "3", imageUrl: "https://putbucketde-demo1.s3.amazonaws.com/HbqjDq1aiSbr1ED76BEA-9ACD-42F8-B73E-9AE34D89CE6A.jpeg" }, 
    // { id: "4", imageUrl: "https://putbucketde-demo1.s3.amazonaws.com/tyikvWPxcjqS7C26DD21-2D0C-4195-A44F-984F7DBB293E.jpeg" }];


    // const pElement2 = this.renderer.selectRootElement('#myinnerdiv1', true);
    // this.renderer.setStyle(pElement2, 'padding', '10%');
    if (this.isMobile == true) {
      const pElement2 = this.renderer.selectRootElement('#myinnerdiv1', true);

      this.renderer.setStyle(pElement2, 'width', '100%');

    }
    if (this.isTablet == true) {
      const pElement2 = this.renderer.selectRootElement('#myinnerdiv1', true);

      this.renderer.setStyle(pElement2, 'width', '75%');

    }
    if (this.isDesktop == true) {
      const pElement2 = this.renderer.selectRootElement('#myinnerdiv1', true);

      this.renderer.setStyle(pElement2, 'width', '40%');
    }

  }

  setValue(any: any) {
    this.selectvalue = this.title[any.target.value - 1].viewValue
    this.selectvalue2 = this.title[any.target.value - 1].value
    this.content.catagoryrefrenceId = this.selectvalue2;
    this.content.title = this.title[any.target.value - 1].viewValue
    this.selectvaluePrompt = undefined;
    console.log(this.selectvalue2);



  }

  async IsDropdwonSelected(value: any) {
    switch (true) {
      case value >= 1 && value <= 5:
        return true;
      default: return false
    }


  }

  async onChangeFile(event: any) {

    for (var i = 0; i < event.target.files.length; i++) {
      this.fileselected = event.target.files[i];
      this.files.push(this.fileselected);
    }
    this.UploadImage();
  }

  puhlish() {

    this.title

    console.log("tiele " + this.content.title)
    //this.test();
    console.log(this.content);
    this.mydata = this.content;

  }


  async UploadImage() {

    this.myprompt = "Image is uploading, please wait..."
    try {
      this.asyncupladFile().then(result => {

        console.log("upload commplete", result);
        //this.GetWidth();
        this.myprompt = null;

        // this.myprompt = "Uplaod complted!"

        console.log(this.imageurls);

        this.content.images = this.imageurls
      });

    }
    catch (error) {
      console.log("error occure", error)
    }

  }
  async asyncupladFile() {
    //this.imageurls = [];
    for (var i = 0; i < this.files.length; i++) {
      await this.handleSelectedFile(i)
    }
    //to avoid duplicted file
    this.files = [];
  }

  async handleSelectedFile(index: any) {
    this.status = null;
    await this.fileuploadService.S3CustomeClient.uploadFile(
      this.files[index],
      this.files[index].type,
      undefined,
      this.makeid(12) + this.files[index].name,
      'public-read'
    )
      .then((data: UploadResponse) => {

        let img: HouseImage = new HouseImage
        // alert(JSON.stringify(data))
        this.status = data.status;
        //var imgUrlCustom = "https://putbucketde-demo1.s3.amazonaws.com/" + data.key;
        img.imageUrl = data.location;
        img.id = this.makeid(5);

        this.imageurls.push(img);

        //this.loaclaStoarage.SetData(this.loaclaStoarage.filetoken, JSON.stringify(this.imageArray));

      })
      .catch((err: any) => console.log(err));
  }

  makeid(length: number) {
    var result = 'id';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  //create tumbnail image
  createThumbnail(imageUrl: string, thumbnailWidth: number, thumbnailHeight: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(image, 0, 0, image.width, image.height, 300, 300, thumbnailWidth, thumbnailHeight);
          const thumbnailDataUrl = canvas.toDataURL('image/jpg');
          resolve(thumbnailDataUrl);
          console.log(thumbnailDataUrl);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      image.onerror = (error) => reject(error);
      image.src = imageUrl;
    });
  }

  async asynctest() {

    let count = 0;

    if (!this.content.description) {
      const pElement = this.renderer.selectRootElement('#description');
      this.renderer.setStyle(pElement, 'border-color', 'red');
      count = count + 1;
    }
    if (!this.content.price) {
      const pElement = this.renderer.selectRootElement('#price');
      this.renderer.setStyle(pElement, 'border-color', 'red');
      count = count + 1;
    }
    if (!this.content.phone) {
      const pElement = this.renderer.selectRootElement('#phone');
      this.renderer.setStyle(pElement, 'border-color', 'red');
      count = count + 1;
    }
    if (!this.content.city) {
      const pElement = this.renderer.selectRootElement('#city');
      this.renderer.setStyle(pElement, 'border-color', 'red');
      count = count + 1;
    }

    await this.IsDropdwonSelected(this.selectvalue2).then((resposne) => {
      console.log("response :\n " + resposne + " \n" + this.selectvalue2)
      if (resposne == false) {
        this.selectvaluePrompt = "Choolse one form dropdown list"
        // const pElement = this.renderer.selectRootElement('#pro');
        // this.renderer.setStyle(pElement, 'border-color', 'red');
        count = count + 1;
      }
    })

    console.log(count + " field not filled")
    console.log("number " + this.content.price)
    console.log("descriptons " + this.content.description)
    console.log("text " + this.content.city)

    return count;
    //alert(this.content.price)
  }

  KeyFoucsOn_description(event: any) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';

    const pElement = this.renderer.selectRootElement('#description');
    this.renderer.setStyle(pElement, 'border-color', 'lightgray');
    // do something with the value
  }
  KeyFoucsOn_city() {
    const pElement = this.renderer.selectRootElement('#city');
    this.renderer.setStyle(pElement, 'border-color', 'lightgray');
    // do something with the value
  }
  KeyFoucsOn_phone() {
    const pElement = this.renderer.selectRootElement('#phone');
    this.renderer.setStyle(pElement, 'border-color', 'lightgray');
    // do something with the value
  }
  KeyFoucsOn_price() {
    const pElement = this.renderer.selectRootElement('#price');
    this.renderer.setStyle(pElement, 'border-color', 'lightgray');
    // do something with the value
  }

  arrayIndex: any;
  onImageclick(event: Event, id: any) {
    event.stopPropagation()
    console.log(id)

    for (var i = 0; i < this.imageurls.length; i++) {


      if (this.imageurls[i].id == id) {
        this.arrayIndex = i;
        console.log(this.imageurls[i].id + "\n" + id)
        const pElement = this.renderer.selectRootElement('#' + id);
        this.renderer.setStyle(pElement, 'border-color', 'darkblue');

        this.timbimageurl = this.imageurls[i].imageUrl



        console.log(this.iconimage)
      }
      else {
        const pElement = this.renderer.selectRootElement('#' + this.imageurls[i].id);
        this.renderer.setStyle(pElement, 'border-color', 'lightgray');
      }
    }

    //console.log(event.target.currentSrc + " \n" + id)
  }
  onButtonClick(id: any) {
    console.log("button clicked :  " + id)
  }
  removeimage(id: any, imgurl: any) {

    let newHOuseImages: HouseImage[] = this.imageurls.filter(x => x.id !== id);
    this.imageurls = newHOuseImages;
    if (this.timbimageurl == imgurl) {
      this.timbimageurl = null;
    }

    this.content.images = this.imageurls;

    // const index = this.imageurls.indexOf(this.timbimageurl, this.arrayIndex);
    // if (index > -1) {
    //   this.imageurls.splice(index, 1);
    // }
  }
  publishmessage: any;
  async PublishContent() {
    var resultTranseltedWord:any = "none";
    const res = await this.validator.IsStringContaionNoneEngChar(this.content.city);
    if(res == true)
    {
       resultTranseltedWord = await this.ameharicService.transletToEngAlph(this.content.city)
    }
    

    try {
      await this.asynctest().then((response) => {
        if (response == 0) {
          let obj = {
            usertoken: this.storage.GetData(this.storage.usertoken).usertoken,
            catagory: this.content.title,
            catagoryReferenceId: this.content.catagoryrefrenceId,
            header: this.content.title,
            Description: this.content.description,
            phone: this.content.phone,
            price: this.content.price,
            State: "No state provided",
            city: this.content.city,
            translateword: resultTranseltedWord,
            zipCode: 0,
            street: "No street address provided",
            detailLists: "detailLists",
            Images: this.content.images,
            IsAddressPublic: false,
          }
          this.houseService.PostHouseServiceTest(obj).subscribe((response) => {
            this.myprompt = "upload completed"
            // alert("Upload completed!")
            this.publishmessage = "Congratulations your content successfully published";
            this.uploadresponse = response
            //this.content = new uploadContent();
            //this.imageurls = [];


          })
        }
        else {
          // alert("all required fields must be filled out")
        }
      })
    }
    catch (error) {
      this.publishmessage = "Publishing fail!";
    }
  }

}
