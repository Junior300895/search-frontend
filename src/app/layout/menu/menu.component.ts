// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/login/authentication.service';

// @Component({
//   selector: 'app-menu',
//   templateUrl: './menu.component.html',
//   styleUrls: ['./menu.component.css']
// })
// export class MenuComponent implements OnInit {
//   title = 'plateforme-seacrh';

//   constructor(private authenticationService : AuthenticationService,
//               private router : Router) {
//   }
//   ngOnInit(): void {
//   }

//   logOut(){
//     this.authenticationService.logOut()
//     this.router.navigateByUrl('/login')
//   }

//   isAdmin(){
//     this.authenticationService.isAdmin()
//   }
//   isUser(){
//     this.authenticationService.isUser()
//   }
//   isAuthenticated() : boolean{
//     return this.authenticationService.isAuthenticated()
//   }
// }
