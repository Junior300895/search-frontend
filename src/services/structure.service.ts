import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../app/login/authentication.service';
import {AppUser} from '../model/AppUser';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private host:string="http://localhost:9101/api"

  constructor(private http : HttpClient, private authService : AuthenticationService) { }

  /**
   * Find method
   */
  findAllUnites(){
    return this.http.get(this.host+"/ms-struct/findAllUnites")
  }
  findAllStructures(){
    return this.http.get(this.host+"/ms-struct/findAllStructures")
  }
  findAllTypeUniteRecherche(){
    return this.http.get(this.host+"/ms-struct/findAllTypeUniteRecherche")
  }
  findChercheursByIdUniteRecherche(id :number){
    return this.http.get(this.host+"/ms-ch/findChercheursByIdUniteRecherche/"+id)
  }

  /**
   * Save method
   */
  saveUniteRecherche(data : any, tur :string, structure : string){
    return this.http.post(this.host+"/ms-struct/saveUniteRecherche/"+tur+"/"+structure, data)
  }
  saveUniteRechercheWithResponsable(data : any, tur :string, structure : string, emailresponsable :string){
    return this.http.post(this.host+"/ms-struct/saveUniteRechercheWithResponsable/"+tur+"/"+structure+"/"+emailresponsable, data)
  }
  deleteUniteRecherche(id : number){
    return this.http.delete(this.host+"/ms-struct/deleteUniteRecherche/"+id)
  }

  /**
   * Get method
   */
  getUniteByLc(lc : string){
    return this.http.get(this.host+"/ms-struct/getUniteByLc/"+lc)
  }
}
