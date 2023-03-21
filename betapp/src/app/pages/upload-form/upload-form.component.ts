import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';
import { uploadContent } from 'src/app/interfaces/uploadContent';
import { FileuploaderService } from 'src/app/services/fileuploader.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


interface Title{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  prompt:any;

  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  myInputValue!: string;
  mydata: any;
  files: File[] = [];
  reader = new FileReader();
  content: uploadContent = new uploadContent();
  imageurls = new Array();
  imagfordsiplay: string[] = [];
  selectvalue: any;
  selectvalue2: any;

  iconimage: any = "https://sm-image-bucket.s3.amazonaws.com/zh3ECH6qg3byimageIcon.png"

  title: Title[] = [
    { value: '1', viewValue: 'የሚለጥፉትን ይምረጡ' },
    { value: '2', viewValue: 'የሚከራይ ሙሉ ቤት' },
    { value: '3', viewValue: 'የሚከራይ ክፍል' },
    { value: '4', viewValue: 'የሚከራይ ምድር ቤት' }
  ];

  status: any = "200";

  imageurl: any = null;
  imagepath: any = "https://putbucketde-demo1.s3.amazonaws.com/bPITFSl2C0zFimageIcon.png"
  fileselected: any = null;
  _img: any;
  base64String: any;
  newimage: any;

  myprompt: any;

  constructor(private fileuploadService: FileuploaderService, private renderer: Renderer2, private breakpointObserver: BreakpointObserver) {

    this.isMobile = breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = breakpointObserver.isMatched('(min-width: 768px) and (max-width: 1023px)');
    this.isDesktop = breakpointObserver.isMatched('(min-width: 1024px)');

    

  }

  ngOnInit(): void {
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

  ngAfterViewInit() {
  
  }


  setValue(any: any) {
    this.selectvalue = this.title[any.target.value - 1].viewValue
    this.selectvalue2 = this.title[any.target.value - 1].value
    this.content.title = this.title[any.target.value - 1].viewValue
   
  }
  async onChangeFile(event: any) {


    for (var i = 0; i < event.target.files.length; i++) {
      this.fileselected = event.target.files[i];
      this.files.push(this.fileselected);
    }

    this.onclick();
  }

  puhlish() {
    if(this.content.images.length == 0)
    {
        alert("You are posting without image")
    }
    this.test();
    
    console.log(this.content);
    this.mydata = this.content;
    // alert(JSON.stringify(this.content))
  }


  async onclick() {

    this.myprompt = "Image is uploading, please wait..."
    try {
      this.asyncupladFile().then(result => {

        console.log("upload commplete", result);
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

        //alert(JSON.stringify(data))
        this.status = data.status;
        //var imgUrlCustom = "https://putbucketde-demo1.s3.amazonaws.com/" + data.key;
        this.imageurl = data.location;

        this.imageurls.push(this.imageurl);

        //this.loaclaStoarage.SetData(this.loaclaStoarage.filetoken, JSON.stringify(this.imageArray));

      })
      .catch((err: any) => console.log(err));
  }

  makeid(length: number) {
    var result = '';
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

  test() {
  


    if (!this.content.description) {
      const pElement = this.renderer.selectRootElement('#description');
      this.renderer.setStyle(pElement, 'border-color', 'red');
    }
    if (!this.content.price) {
      const pElement = this.renderer.selectRootElement('#price');
      this.renderer.setStyle(pElement, 'border-color', 'red');
    }
    if (!this.content.phone) {
      const pElement = this.renderer.selectRootElement('#phone');
      this.renderer.setStyle(pElement, 'border-color', 'red');
    }
    if (!this.content.city) {
      const pElement = this.renderer.selectRootElement('#city');
      this.renderer.setStyle(pElement, 'border-color', 'red');
    }


    console.log("number " + this.content.price)
    console.log("descriptons " + this.content.description)
    console.log("text " + this.content.city)
    //alert(this.content.price)
  }

  KeyFoucsOn_description(event:any) {
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




}
