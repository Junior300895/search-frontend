import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  host:string = "http://localhost:8080"
  jwt:string
  username:string
  roles:Array<string>
  constructor(private http:HttpClient){
  }
  login(data){
    return this.http.post(this.host+"/login", data,{observe:'response'})
  }
  getIdentiteUser(){
    return this.http.get(this.host+"/appUsers/"+this.username)
  }
  saveToken(jwt: string) {
    localStorage.setItem('token',jwt);
    this.jwt=jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.sub;
    this.roles = objJWT.roles;
  }
  getUsername(){
    return this.username
  }
  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0
  }
  isUser(){
    return this.roles.indexOf('USER')>=0
  }
  isAuthor(){
    return this.roles.indexOf('AUTHOR')>=0
  }
  isAuthenticated(){
    return this.roles && (this.isAdmin() || this.isUser() || this.isAuthor());
  }

  loadToken() {
    this.jwt = localStorage.getItem('token');
    this.parseJWT()
  }

  logOut() {
    localStorage.removeItem('token')
    this.initParams()
  }
  initParams(){
    this.jwt=undefined
    this.username=undefined
    this.roles=undefined
  }
}
