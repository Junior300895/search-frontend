import {Component, OnInit, ViewChild} from '@angular/core';

import {ProductionService} from '../../services/production.service';
import {ActivatedRoute} from '@angular/router';
import {Production} from '../../model/Production';
import {Thematique} from '../../model/Thematique';
import {AuthenticationService} from '../login/authentication.service';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';
import {ChercheurService} from '../../services/chercheur.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../services/notification-service';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-gestion-production',
  templateUrl: './gestion-production.component.html',
  styleUrls: ['./gestion-production.component.css']
})
export class GestionProductionComponent implements OnInit {
  productions : Production[];
  production : Production = new Production();
  thematiques : Thematique[];
  nomthematique : string
  typepublications : any;
  typeproductionsbypub : any
  typeproductionsbycom : any
  typepub : string

  show : any
  showes: string;

  chercheurMail = new Map<string, number>();
  email : string
  note : number
  keys : any
  private idProd: number;
  chercheurs : any
  private succes: any;

  displayedColumns: string[] = [
    'idProduction', 'nomThematique', 'datemiseenligne', 'numvol','pages','type','action'
  ];
  dataSource : any
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private uploadedFiles: any;
  private date: any
  private namefile: any;

  constructor(private productionService : ProductionService,
              private route : ActivatedRoute, private productionservice : ProductionService,
              private authenticationService: AuthenticationService, private notificationService: NotificationService,
              private chercheurservice : ChercheurService,private confirmationDialogService: ConfirmationDialogService,
              private uploadService : UploadService) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      if("Publication" == params.get("Tp")){
        this.getProductions("Publication")
        this.showes="pub"
      }else if ("Communication" == params.get("Tp")){
        this.getProductions("Communication")
        this.showes="com"
      }
    });
    this.show = 'Productions'
    this.getTypePublications()
    this.getTypeProductionsByCommunication()
    this.getTypeProductionsByPublication()
    this.listThematique()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getProductions(typeProd : string){
    this.productionService.getProductions(typeProd).subscribe(
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

  showForm() {
    this.show = 'formProduction';
  }

  addAuthors(idProd : number){
    this.show = "addAuthors"
    this.idProd = idProd
    this.getProductionsById(idProd)
    this.succes = false
  }
  getProductionsById(idProd : number){
    this.productionService.getProductionsById(idProd).subscribe(
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
    this.productionService.addAuthorsImplicatedInPublication(idProd, this.strMapToObj(this.chercheurMail)).subscribe(
      data=>{
        console.log("addAuthorsImplicatedInPublication",data)
        this.succes = true
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
  onListPublications(){
    this.show = "Productions"
    this.succes = false
  }

  saveProduction(){
    //console.log("typub nomth : ",this.typepub,this.nomthematique)
    console.log("production saved => ",this.production)
    console.log("production infos => ",this.typepub,this.nomthematique, this.namefile)
    this.productionservice.saveProduction(this.production,this.typepub,
      "diallodiery301@gmail.com",this.nomthematique).subscribe(
      data=>{
        console.log(data)
        this.notificationService.success("Production ajoutée !!! ")
        if (this.showes == 'pub') this.getProductions("Publication")
        else this.getProductions("Communication")
      },error1 => {
        console.log(error1)
      }
    )
  }
  onSaveProduction(){
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous ajouter cette production ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.upload()
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  onCreatePublication(){
    this.show="create-production"
    this.succes=false
  }
  getTypePublications(){
    this.productionservice.getTypeProductions()
      .subscribe(data=>{
        this.typepublications = data
      }, error1 => {
        console.log(error1)
      })
  }
  getTypeProductionsByPublication(){
    this.productionservice.getTypeProductionsByPublication()
      .subscribe(data=>{
        this.typeproductionsbypub = data
      }, error1 => {
        console.log(error1)
      })
  }
  getTypeProductionsByCommunication(){
    this.productionservice.getTypeProductionsByCommunication()
      .subscribe(data=>{
        this.typeproductionsbycom = data
      }, error1 => {
        console.log(error1)
      })
  }
  listThematique(){
    this.chercheurservice.listThematique().subscribe(
      (data:Thematique[]) =>{
        this.thematiques = data
        console.log(data)
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
    this.productionService.deleteProduction(idProduction).subscribe(
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

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.date = new Date().valueOf()
    this.namefile = this.date+"_"+this.uploadedFiles[0].name
    this.production.fichier = this.namefile
    console.log("upload file : ",this.uploadedFiles, this.namefile)
  }
  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      //formData.append("files", this.uploadedFiles[i], this.namefile);
      formData.append("files", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.uploadService.upload(formData).subscribe(
      (response) => {
        console.log('response received is ', response);
        this.saveProduction()
      },error => {
        console.log(error)
      })
  }
}
