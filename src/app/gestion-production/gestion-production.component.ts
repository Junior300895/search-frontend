import {Component, OnInit, ViewChild} from '@angular/core';

import {ProductionService} from '../../services/production.service';
import {ActivatedRoute} from '@angular/router';
import {Production} from '../../model/Production';
import {Thematique} from '../../model/Thematique';
import {AuthenticationService} from '../login/authentication.service';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';
import {ChercheurService} from '../../services/chercheur.service';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import {NotificationService} from '../../services/notification-service';
import {UploadService} from '../../services/upload.service';
import { FormGestionproductionComponent } from './form-gestionproduction/form-gestionproduction.component';
import { UploadFileResponse } from 'src/model/uploadfileresponse';

@Component({
  selector: 'app-gestion-production',
  templateUrl: './gestion-production.component.html',
  styleUrls: ['./gestion-production.component.css']
})
export class GestionProductionComponent implements OnInit {
  productions : Production[];
  production : Production = new Production();
  nomthematique : string

  typepub : string
  showes: string;

  chercheurMail = new Map<string, number>();
  email : string
  note : number
  keys : any
  chercheurs : any

  displayedColumns: string[] = [
    'idProduction', 'nomThematique', 'datemiseenligne', 'numvol','pages','type','action'
  ];
  dataSource : any
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private uploadedFiles: any;
  private date: any
  private namefile: any;

  constructor(private productionservice : ProductionService,
              private route : ActivatedRoute,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private confirmationDialogService: ConfirmationDialogService,
              private dialog: MatDialog,
              private uploadService : UploadService,
              ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      if("Publication" == params.get("Tp")){
        this.getProductions("Publication")
      }else if ("Communication" == params.get("Tp")){
        this.getProductions("Communication")
      }
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getProductions(typeProd : string){
    this.productionservice.getProductions(typeProd).subscribe(
      data=>{
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
        console.log("donnees prod : ",data)
        console.log("donnees datasource : ",this.dataSource.paginator)
      },error => {
        console.log(error)
      }
    )
  }

  addAuthors(idProd : number){
    this.getProductionsById(idProd)
  }
  getProductionsById(idProd : number){
    this.productionservice.getProductionsById(idProd).subscribe(
      data=>{
        this.chercheurs = data
        console.log(this.chercheurs.chercheurProductions)

        for (let chercheur of this.chercheurs.chercheurProductions) {
          this.chercheurMail.set(chercheur.emailChercheur, chercheur.rangChercheur)
        }
        this.keys = Array.from (this.chercheurMail.keys());
      }, error => {
        console.log(error)
      }
    )
  }
  onAddChercheur() {
    this.chercheurMail.set(this.email, this.note)
    this.chercheurMail.forEach((value, key) => {
      console.log(key, value)
    })
    this.keys = Array.from (this.chercheurMail.keys());
    for(let key of this.keys){
      console.log("key : ",key, "value : ", this.chercheurMail.get(key))
    }
  }
  onRemoveChercheur(key:any) {
    this.chercheurMail.delete(key)
    this.keys = Array.from (this.chercheurMail.keys());
  }

  addAuthorsImplicatedInPublication(idProd : number){
    this.productionservice.addAuthorsImplicatedInPublication(idProd, this.strMapToObj(this.chercheurMail)).subscribe(
      data=>{
        console.log("addAuthorsImplicatedInPublication",data)
      },error1 => {
        console.log(error1)
      }
    )
  }
  // convertit un Map en un type object
  strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }

  addProduction() {
    const dialogRef = this.dialog.open(FormGestionproductionComponent, {
      width: '700px',
      height: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ",result);
      let production : Production = new Production()
      production = result.productions

      this.upload(result.uploadedFiles, result.production,
         result.infos.typepub, 'diallodiery301@gmail.com',result.infos.nomthematique)
    });
  }

  upload(uploadedFiles: any, production: Production, typepub: string,
                                email: string, lcThematique: string) {
    let formData = new FormData();
    for (var i = 0; i < uploadedFiles.length; i++) {
      //formData.append("files", this.uploadedFiles[i], this.namefile);
      formData.append("file", uploadedFiles[i], uploadedFiles[i].name);
    }
    console.log('form data ', formData)
    this.uploadService.upload(formData).subscribe(
      (response : UploadFileResponse) => {
        console.log('response received is ', response);
        production.fichier = response.fileName
        this.saveProduction(production, typepub, email, lcThematique)
      },error => {
        console.log(error)
      })
  }
  saveProduction(production: Production, typepub : string, email : string, lcThematique: string){
    // email = "diallodiery301@gmail.com"
    this.productionservice.saveProduction(production, typepub, email, lcThematique)
      .subscribe(data=>{
        console.log(data)
        this.notificationService.success("Production ajoutée !!! ")
        // if (this.showes == 'pub') this.getProductions("Publication")
        // else this.getProductions("Communication")
      },error1 => {
        console.log(error1)
      }
    )
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated()
  }
  isAuthor(){
    return this.authenticationService.isAuthor()
  }

  deleteProd(idProduction: any) {
    this.productionservice.deleteProduction(idProduction).subscribe(
      data => {
        console.log(data)
        if(data!=null){
          this.notificationService.warn("Production supprimée !!!")
          if (this.showes == 'pub') this.getProductions("Publication")
          else this.getProductions("Communication")
        }
      }, error => {
        console.log(error)
      }
    )
  }
  onDeleteProd(id : number){
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer cette production ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.deleteProd(id)
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }
}
