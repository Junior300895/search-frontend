import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../app/login/authentication.service';
import {Appeloffre} from '../model/Appeloffre';
import {Thematique} from '../model/Thematique';
import {ChercheurService} from './chercheur.service';

@Injectable({
  providedIn: 'root'
})
export class AppeldoffresService {
  thematique:any
  private host:string="http://localhost:8080/api/ms-ao"

  constructor(private http : HttpClient, private authService : AuthenticationService,
              private chercheurService:ChercheurService) { }

  getAppeldoffre(idAO:number){
    return this.http.get(this.host+"/appeloffres/"+idAO)
  }
  listAppeloffre(){
    //let headers=new HttpHeaders({'authorization':'Bearer '+this.authService.jwt})
    //return this.http.get(this.host+"/appeloffres",{headers:headers})
    return this.http.get(this.host+"/appeloffres")
  }
  saveAppeloffre(appeloffre:Appeloffre, lcThematique:string){
    return this.http.post(this.host+"/saveAO/"+lcThematique,appeloffre);
  }
}
