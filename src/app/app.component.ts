import {Component, OnInit} from '@angular/core';
import {KeycloakSecurityService} from '../services/keycloak-security-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'plateforme-seacrh';

  constructor(private securityService : KeycloakSecurityService) {
  }
  ngOnInit(): void {
  }

  login(){
    this.securityService.keycloakAuth.login()
  }
  logout(){
    this.securityService.keycloakAuth.logout()
  }
  onChangePassword(){
    this.securityService.keycloakAuth.accountManagement()
  }
}
