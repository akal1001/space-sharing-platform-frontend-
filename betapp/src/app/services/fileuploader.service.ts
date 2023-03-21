import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FileuploaderService {

  private _baseUploadUrl = environment.baseurl + 'File/';
  imageurl: any = null;
  constructor(private httpclient: HttpClient) { }
  ngOnInit(): void { }
  fileselected: any = null;
  config = {
    bucketName: 'sm-image-bucket',
    region: 'us-east-1',
    accessKeyId: environment.aws_access_key,
    secretAccessKey: environment.aws_secret_key,
    s3Url: 'https://sm-image-bucket.s3.amazonaws.com/',
  };
  S3CustomeClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(this.config);

  //add media file
  AddmedialFileService(refernanceId: any, mediaurl: any): Observable<any> {
    let endpoint = "addhouseimage?referenceId=" + refernanceId + "&imageurl=" + mediaurl
    return this.httpclient.post<any>(this._baseUploadUrl + endpoint, "")
  }

  //send fiel to s3 bucket(test)
  SendFileToS3(forma: any): Observable<any> {
    // alert(forma);
    const endpoint = environment.baseurl2;// "https://localhost:60715/api/values/putfile?id=" + "base64";
    return this.httpclient.post<any>(endpoint, forma);
  }
}