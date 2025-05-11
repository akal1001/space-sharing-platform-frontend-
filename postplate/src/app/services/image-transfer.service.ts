import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, from, Observable } from 'rxjs';
import { Somee_Config } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ImageTransferService {

  constructor(private http: HttpClient) {}
  
  uploadImageToS3FromUrl(imageUrl: string): Observable<any> {
    return from(
      fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'recipe-image.png', { type: blob.type });
  
          const formData = new FormData();
          formData.append('files', file);
  
          const headers = new HttpHeaders().set('apikey', Somee_Config.apiKey); // Replace with your real API key
  
          return this.http.post(Somee_Config.apiUrl, formData, { headers });
        })
    );
  }
  
  uploadImageToS3FromUrl1(imageUrl: string): void {
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'recipe-image.png', { type: blob.type });
  
        const formData = new FormData();
        formData.append('files', file);
  
        const headers = new HttpHeaders().set('apikey', Somee_Config.apiKey); // Replace with your real API key
  
        this.http.post(Somee_Config.apiUrl, formData, { headers })
          .subscribe({
            next: response => console.log('Upload successful', response),
            error: err => console.error('Upload failed', err)
          });
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }
}
