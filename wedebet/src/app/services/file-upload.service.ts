import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Somee_Config } from '../app.config'
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  uploadFiles(files: File[] | FileList): Observable<any> {

    const formData: FormData = new FormData();
    const fileArray = Array.isArray(files) ? files : Array.from(files);

    fileArray.forEach(file => {
      if (file instanceof File) {
        formData.append('files', file, file.name);
      } else {
        console.error('Invalid file type:', file);
      }
    });
    const headers = new HttpHeaders().set('apikey', Somee_Config.apiKey);
    return this.http.post(Somee_Config.apiUrl, formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error during upload:', error);
        return throwError(() => error);
      })
    );
  }
}
