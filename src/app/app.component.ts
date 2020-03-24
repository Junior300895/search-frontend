import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from './login/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'plateforme-seacrh';

  constructor(private authenticationService : AuthenticationService,
              private router : Router) {
  }
  ngOnInit(): void {
  }

  logOut(){
    this.authenticationService.logOut()
    this.router.navigateByUrl('/login')
  }

  isAdmin(){
    this.authenticationService.isAdmin()
  }
  isUser(){
    this.authenticationService.isUser()
  }
  isAuthenticated() : boolean{
    return this.authenticationService.isAuthenticated()
  }
}
