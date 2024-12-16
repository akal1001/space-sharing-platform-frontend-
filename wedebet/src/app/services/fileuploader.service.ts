import { Injectable } from '@angular/core';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {aws_Config} from '../app.config'
@Injectable({
  providedIn: 'root'
})
export class FileuploaderService {

  private s3: S3Client;

  constructor() {
    aws_Config
    this.s3 = new S3Client({
      region: aws_Config.region,
      credentials: {
        accessKeyId: aws_Config.aws_access_key,
        secretAccessKey: aws_Config.aws_secret_key
      },
    });
  }

  // async uploadFile(file: File): Promise<string> {
  //   const fileName = `${Date.now()}-${file.name}`; 
  //   const params = {
  //     Bucket: aws_Config.bucketName,
  //     Key: fileName,
  //     Body: file,
  //     ContentType: file.type,
  //   };

  //   try {
  //     await this.s3.send(new PutObjectCommand(params));
  //     const fileUrl = aws_Config.s3Url+fileName;
  //     console.log(fileUrl)
  //     return fileUrl; 
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     throw error;
  //   }
  // }

  async uploadFile(file: File): Promise<{ status: string; message: string; fileUrl?: string }> {
    const fileName = `${Date.now()}-${file.name}`;
    const params = {
      Bucket: aws_Config.bucketName,
      Key: fileName,
      Body: file,
      ContentType: file.type,
    };
  
    try {
      await this.s3.send(new PutObjectCommand(params));
      const fileUrl = aws_Config.s3Url + fileName;
      console.log('File uploaded successfully:', fileUrl);
      return {
        status: 'success',
        message: 'File uploaded successfully.',
        fileUrl,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      return {
        status: 'error',
        message: 'Error uploading file. Please try again.',
      };
    }
  }
  
}