import { Injectable } from '@angular/core';
import {KeycloakInstance} from 'keycloak-js';
declare var Keycloak : any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public keycloakAuth: KeycloakInstance;

  constructor() { }

  async init() {
    console.log("Security initialisation ...")

    // const config = {
    //     'url': 'http://localhost:8080/auth/',
    //     'realm': 'plateforme-recherche',
    //     'clientId': 'plateforme-search-web'
    //   };
     //this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth = new Keycloak({
        url: "http://localhost:8080/auth/",
        realm: "plateforme-recherche",
        clientId: "plateforme-search-web"
      });

      await this.keycloakAuth.init({
        //onLoad: 'login-required',
        onLoad: "check-sso",
        promiseType:"native"
      });
    console.log("token : ",this.keycloakAuth.token)

  }
  getToken(): string {
    return this.keycloakAuth.token;
  }
}
