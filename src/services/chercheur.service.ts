import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../app/login/authentication.service';
import {Chercheur} from '../model/Chercheur';

@Injectable({
  providedIn: 'root'
})
export class ChercheurService {
  private host:string="http://localhost:8080/api"

  constructor(private http : HttpClient, private authService : AuthenticationService) { }

  getThematiqueByLc(libeleCourt:string){
    return this.http.get(this.host+"/ms-ch/getThematique/"+libeleCourt)
  }
  listThematique(){
    return this.http.get(this.host+"/ms-ch/thematiques")
  }
  findAllChercheurs(){
    return this.http.get(this.host+"/ms-ch/chercheurs")
  }
  saveChercheur(chercheur : any, lcThe : string, lcFct : string, lcGra : string,
                lcSta : string, lcStruct : string, lcUnit : string){
    return this.http.post(this.host+"/ms-ch/saveChercheur"+"/"+lcThe+"/"+lcFct+"/"+lcGra+"/"+lcSta+"/"+lcStruct+"/"+lcUnit, chercheur);
  }
  // findAllUnites(){
  //   return this.http.get(this.host+"/ms-struct/findAllUnites")
  // }
  // findAllStructures(){
  //   return this.http.get(this.host+"/ms-struct/findAllStructures")
  // }
  findAllThematiques(){
    return this.http.get(this.host+"/ms-ch/findAllThematiques")
  }
  findAllFonctions(){
    return this.http.get(this.host+"/ms-ch/findAllFonctions")
  }
  findAllGrades(){
    return this.http.get(this.host+"/ms-ch/findAllGrades")
  }
  findAllStatuts(){
    return this.http.get(this.host+"/ms-ch/findAllStatuts")
  }
  deleteChercheur(id : string){
    return this.http.delete(this.host+"/ms-ch/deleteChercheur/"+id)
  }
  findChercheurByEmail(email : string){
    return this.http.get(this.host+"/ms-ch/chercheurs/"+email)
  }
}
