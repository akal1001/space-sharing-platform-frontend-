import { Component, OnInit } from '@angular/core';
import { FileuploaderService } from 'src/app/services/fileuploader.service';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { HomeService } from 'src/app/services/home.service';
import { House } from 'src/app/interfaces/house';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent implements OnInit {
  status: any = "200";
  reader = new FileReader();
  imageurl: any = null;
  imagepath: any;
  fileselected: any = null;
  _img: any;

  newimage:any;

  imageArray:any = new Array();
  constructor(private fileuploadService: FileuploaderService, private router: Router, private houseservice: HomeService, private loaclaStoarage: LoaclstoarageService) { }

  ngOnInit(): void {

    var reselt = this.loaclaStoarage.GetData(this.loaclaStoarage.usertoken);

    if(reselt == null || reselt == undefined)
    {
       this.router.navigateByUrl("/login")
    }
    //this.addimagetoLoclastoraget();
  }




  onChangeFile(event: any) {
    console.log(event.target.files[0]);
    this.fileselected = event.target.files[0];


      this.reader.readAsDataURL(this.fileselected);
      this.reader.onload = (_event) =>
      {

        var image = new Image();
        this.imagepath = this.reader.result;


        // var canvas = document.createElement('canvas');
        // canvas.width = 100;
        // canvas.height = 100;

        // this.newimage = canvas.toDataURL(this.imagepath);

        this.handleSelectedFile();

      }


  }
  async handleSelectedFile() {
    this.status = null;
    console.log('eneveoment');

    await this.fileuploadService.S3CustomeClient.uploadFile(
      this.fileselected,
      this.fileselected.types,
      undefined,
      this.makeid(12) + this.fileselected.name,
      'public-read'
    )
      .then((data: UploadResponse) => {

        this.status = data.status;
        console.log(data.status);
        console.log(data.location);
        this.imageurl = data.location;
        //this.addimages(data.location);
        //  alert(this.imageurl);

        this.imageArray.push(this.imageurl);

        // alert(this.imageurl + ";;")

        this.loaclaStoarage.SetData(this.loaclaStoarage.filetoken, JSON.stringify(this.imageArray));








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
  continue() {
    this.router.navigateByUrl("/preview")
  }






  addimages(imageurl: any) {

    let refid = this.loaclaStoarage.GetData(this.loaclaStoarage.houseforPostkey);
    //alert("refrance id " + refid.houseid);
    this.fileuploadService.AddmedialFileService(refid.houseid, imageurl).subscribe((response: any) => {
      console.log(response);
    })

  }




  public h: any;
  //cnstract post


  clear() {
    this.loaclaStoarage.ClearStorage();
  }

  setnull() {
    this.loaclaStoarage.SetData(this.loaclaStoarage.houseforPostkey, '');
    this.loaclaStoarage.SetData(this.loaclaStoarage.addressforpostKey, '');



  }
}
