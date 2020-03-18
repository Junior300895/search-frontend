import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../app/login/authentication.service';
import {Appeloffre} from '../model/Appeloffre';
import {Thematique} from '../model/Thematique';
import {ChercheurService} from './chercheur.service';

@Injectable({
  providedIn: 'root'
})
export class InfosChercheur {
  thematique:any
  private host:string="http://localhost:9101/api/ms-ch"

  constructor(private http : HttpClient, private authService : AuthenticationService,
              ){ }

  getThematiques(){
    return this.http.get(this.host+"/findAllThematiques/")
  }
  getFonctions(){
    return this.http.get(this.host+"/findAllFonctions/")
  }
  getGrades(){
    return this.http.get(this.host+"/findAllGrades/")
  }
  getStatuts(){
    return this.http.get(this.host+"/findAllStatuts/")
  }
  saveThematique(libele : string){
    return this.http.post(this.host+"/saveThematique/"+libele,null)
  }
  saveFonction(libele : string){
    return this.http.post(this.host+"/saveFonction/"+libele,null)
  }
  saveGrade(libele : string){
    return this.http.post(this.host+"/saveGrade/"+libele,null)
  }
  saveStatut(libele : string){
    return this.http.post(this.host+"/saveStatut/"+libele,null)
  }
  deleteThematique(libele : string){
    return this.http.delete(this.host+"/deleteThematique/"+libele)
  }
  deleteFonction(libele : string){
    return this.http.delete(this.host+"/deleteFonction/"+libele)
  }
  deleteGrade(libele : string){
    return this.http.delete(this.host+"/deleteGrade/"+libele)
  }
  deleteStatut(libele : string){
    return this.http.delete(this.host+"/deleteStatut/"+libele)
  }

  /**
   * Recherche d'infos
   */
  findThematiqueByLc(libele : string){
    return this.http.get(this.host+"/findThematiqueByLc/"+libele)
  }
  findFonctionByLc(libele : string){
    return this.http.get(this.host+"/findFonctionByLc/"+libele)
  }
  findGradeByLc(libele : string){
    return this.http.get(this.host+"/findGradeByLc/"+libele)
  }
  findStatutByLc(libele : string){
    return this.http.get(this.host+"/findStatutByLc/"+libele)
  }

  /*
   * Update infos
   */
  updateThematiqueByLc(id : number, libele : string){
    return this.http.post(this.host+"/updateThematique/"+id+"/"+libele, null)
  }
  updateFonctionByLc(id : number, libele : string){
    return this.http.post(this.host+"/updateFonction/"+id+"/"+libele, null)
  }
  updateGradeByLc(id : number, libele : string){
    return this.http.post(this.host+"/updateGrade/"+id+"/"+libele, null)
  }
  updateStatutByLc(id : number, libele : string){
    return this.http.post(this.host+"/updateStatut/"+id+"/"+libele, null)
  }
}
