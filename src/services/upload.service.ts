import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from 'src/app/login/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  thematique:any
  private host:string="http://localhost:9101/api/ms-noti"
  //private host:string="http://localhost:9103"

  constructor(private http : HttpClient,
              private authService : AuthenticationService) { }

  upload(formData){
    this.authService.loadToken()
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(this.host+"/uploadFile/", formData,{headers:headers});
  }
  download(nameFile : string){
    this.authService.loadToken()
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host+"/downloadFile/"+nameFile,
        {responseType: 'blob',headers:headers} );
  }
}
