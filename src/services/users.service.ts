import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../app/login/authentication.service';
import {AppUser} from '../model/AppUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private host:string="http://localhost:8080"

  constructor(private http : HttpClient, private authService : AuthenticationService) { }

  getUsers(){
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host+"/appUsers/users",{headers:headers})
  }

  getRessource(url){
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(url,{headers:headers})
  }
  saveUser(appUser : AppUser, roles : Array<string>){
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(this.host+"/saveUser/"+roles,appUser,{headers:headers})
  }
  deleteAppUser(email : string){
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.host+"/deleteAppUser/"+email,{headers:headers})
  }
  getUser(email : string){
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host+"/appUsers/"+email,{headers:headers})
  }
}
