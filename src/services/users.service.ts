import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../app/login/authentication.service';
import {AppUser} from '../model/AppUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private host:string="http://localhost:9101"

  constructor(private http : HttpClient, private authService : AuthenticationService) { }

  getUsers(){
    this.authService.loadToken()
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host+"/users",{headers:headers})
  }

  getRessource(url){
    this.authService.loadToken()
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(url,{headers:headers})
  }
  saveUser(appUser : AppUser, roles : Array<string>){
    this.authService.loadToken()
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.post(this.host+"/users/"+roles,appUser,{headers:headers})
  }
  updateUser(appUser : AppUser, email: string, roles : Array<string>){
    this.authService.loadToken()
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.put(this.host+"/users/"+email+"/"+roles,appUser,{headers:headers})
  }
  deleteAppUser(email : string){
    this.authService.loadToken()
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.delete(this.host+"/users/"+email,{headers:headers})
  }
  getUser(email : string){
    this.authService.loadToken()
    let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    return this.http.get(this.host+"/users/"+email,{headers:headers})
  }
}
