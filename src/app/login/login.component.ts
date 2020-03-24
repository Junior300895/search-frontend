import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {AppUser} from '../../model/AppUser';
import {Info} from '../../model/Info';
//import {AuthenticationService} from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  info : Info = new Info();

  constructor(private authenticationService: AuthenticationService,
              private router : Router) { }
  ngOnInit() {
  }

  login(){
    this.authenticationService.login(this.info).subscribe(resp=>{
       let jwt = resp.headers.get('Authorization')
       this.authenticationService.saveToken(jwt)
       this.router.navigateByUrl("/users")
      console.log(this.info)
    },error1 => {
      console.log(error1)
    });
  }

  isAdmin(){
    this.authenticationService.isAdmin()
  }
  isUser(){
    this.authenticationService.isUser()
  }

}
