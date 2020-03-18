import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  thematique:any
  private host:string="http://localhost:9101/api/ms-noti"
  //private host:string="http://localhost:9103"

  constructor(private http : HttpClient) { }

  upload(formData){
    return this.http.post(this.host+"/uploadMultipleFiles/", formData);
  }
  download(nameFile : string){
    return this.http.get(this.host+"/downloadFile/"+nameFile);
  }
}
