import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Production} from '../model/Production';

@Injectable({
  providedIn: 'root'
})

export class ProductionService {
  private host:string="http://localhost:8080/api/ms-pubcom"
  //private host:string="http://localhost:9004"

  constructor(private http : HttpClient) { }

  saveProduction(pub:Production, typepub:string, email:string, thematique:string){
    return this.http.post(this.host+"/saveProduction/"+typepub+"/"+email+"/"+thematique,pub)
  }
  saveProductionWithAuthors(production:Production,emails:Map<string, number>, typepub:string, thematique:string ){
    return this.http.post(this.host+"/saveProductionWithAuthors/"+typepub+"/"+thematique , [production, emails])
  }
  addAuthorsImplicatedInPublication(idProd:number, emails: Map<string, number> ){
    return this.http.post(this.host+"/addAuthorsImplicatedInPublication/"+idProd, emails)
  }
  getProductions(typeProd : string){
    return this.http.get(this.host+"/productionsByTp/"+typeProd)
  }
  getProductionsById(idProd : number){
    return this.http.get(this.host+"/productions/"+idProd)
  }
  getPublications(){
    return this.http.get(this.host+"/productionsByTp/Publication")
  }
  getCommunications(){
    return this.http.get(this.host+"/productionsByTp/Communication")
  }
  getPublication(idPub:number){
    return this.http.get(this.host+"/productions/"+idPub)
  }
  getTypePublications(){
    return this.http.get(this.host+"/typeProductions")
  }
  deleteProduction(id : number){
    return this.http.delete(this.host+"/deleteProduction/"+id)
  }
  // listCommunication(){
  //   return this.http.get(this.host+"/communications")
  // }
  // getCommunication(idCom:number){
  //   return this.http.get(this.host+"/communications/"+idCom)
  // }
}
