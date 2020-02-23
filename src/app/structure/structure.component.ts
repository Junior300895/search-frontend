import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {StructureService} from '../../services/structure.service';
import {FormStructComponent} from './form-struct/form-struct.component';
import {NotificationService} from '../../services/notification-service';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';
import {Chercheur} from '../../model/Chercheur';
import {ChercheurService} from '../../services/chercheur.service';
import {FormComponent} from '../gestion-infos-chercheur/form/form.component';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {

  private structures: any;
  private typeUnites: any;
  private chercheurs: any;
  unite : { }
  uniteFound : any

  displayedColumns: string[] = ['id','libeleCourt','email','responsable','structure','actions'];
  displayedColumnsChercheur: string[] = [
    'prenom', 'nom', 'email', 'ne_le','lieu_naiss',
  ];

  dataSourceChercheurs : any
  dataSource: any;

  @ViewChild('paginatorchercheur', {static: true}) paginatorchercheur: MatPaginator;
  @ViewChild('paginatorunite', {static: true}) paginatorunite: MatPaginator;
  show: string;

  constructor(private dialog: MatDialog, private structureService : StructureService,
              private notificationService: NotificationService,
              private confirmationDialogService: ConfirmationDialogService,
              private chercheurService : ChercheurService) { }

  ngOnInit() {
    this.getUnites()
    this.getStructures()
    this.getTypeUnites()
    this.getChercheurs()
    this.show = 'listunites'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceChercheurs.filter = filterValue.trim().toLowerCase();
  }
  /**
   * Get method
   */
  getStructures(){
    this.structureService.findAllStructures().subscribe(
      data => {
        this.structures = data
        console.log("structures : ",data)
      }, error => {
        console.log(error)
      }
    )
  }
  getUnites(){
    this.structureService.findAllUnites().subscribe(
      data => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data
        this.dataSource.paginator = this.paginatorunite;
        console.log("structures : ",data)
      }, error => {
        console.log(error)
      }
    )
  }
  getTypeUnites(){
    this.structureService.findAllTypeUniteRecherche().subscribe(
      data => {
        this.typeUnites = data
        console.log("type unite : ",data)
      }, error => {
        console.log(error)
      }
    )
  }
  getChercheursByUniteRecherche(id :number){
    this.structureService.findChercheursByIdUniteRecherche(id).subscribe(
      data => {
        this.dataSourceChercheurs = new MatTableDataSource();
        this.dataSourceChercheurs.data = data
        this.dataSourceChercheurs.paginator = this.paginatorchercheur;
        console.log("liste chercheurs de l'unité : ",data)
      }, error => {
        console.log(error)
      }
    )
    this.show = 'listchercheurs'
  }
  getChercheurs(){
    this.chercheurService.findAllChercheurs().subscribe(
      (data:Chercheur[]) => {
        this.chercheurs = data
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }
  getUniteByLc(lc : string){
    this.structureService.getUniteByLc(lc).subscribe(
      data=> {
        this.uniteFound = data
        console.log("uniteFound : ",data)
      }, error => {
        console.log(error)
      }
    )
  }
  /**
   * Save method
   */
  saveUnite(data :any, tur :string, structure :string, emailresponsable :string, notification :string){
    this.structureService.saveUniteRechercheWithResponsable(data, tur, structure, emailresponsable).subscribe(
      data => {
        this.getUnites()
        this.notificationService.success(notification);
        console.log("unite saved", data)
      }, error => {
        console.log(error)
      }
    )
  }
  /**
   * Delete method
   */
  deleteUniteRecherche(id:number){
    this.structureService.deleteUniteRecherche(id).subscribe(
      data => {
        this.getUnites()
        this.notificationService.warn('! Suppression réussie')
        console.log("delete unite",data)
      }, error => {
        console.log(error)
      }
    )
  }

  public onDeleteUnite(id : number) {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer cet élément ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.deleteUniteRecherche(id)
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  onFormUnite() {
    const dialogRef = this.dialog.open(FormStructComponent, {
      width: '600px',
      height: '430px',
      //data: this.data
      data: {idUnite : null, libeleCourt : null, adresse : null, email : null,
        structures : this.structures, typeUnites : this.typeUnites, chercheurs : this.chercheurs}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.unite = {libeleCourt : result.libeleCourt, email : result.email, adresse : result.adresse}
      console.log("unitee :", this.unite)
      console.log("Dialog result: ",result);
      this.saveUnite(this.unite, result.typeUnite, result.structure, result.chercheur, 'Ajout réussi')
    });
  }

  onModifyUnite(lc: string) {
    this.getUniteByLc(lc);
    setTimeout (() => {

      if(this.uniteFound.responsable == null){
        const dialogRef = this.dialog.open(FormStructComponent, {
          width: '600px',
          height: '430px',
          data: {
            idUnite : this.uniteFound.idUnite,
            libeleCourt : this.uniteFound.libeleCourt, adresse : this.uniteFound.adresse, email : this.uniteFound.email,
            structures : this.structures, typeUnites : this.typeUnites, chercheurs : this.chercheurs,
            structure : this.uniteFound.structure.libeleCourt,
            typeUnite : this.uniteFound.typeUniteRecherche.libeleCourt,
            chercheur : null,
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.unite = {idUnite : result.idUnite, libeleCourt : result.libeleCourt, email : result.email, adresse : result.adresse}
          console.log("unitee :", this.unite)
          console.log("Dialog result: ",result);
          this.saveUnite(this.unite, result.typeUnite, result.structure, result.chercheur, 'Modification réussie')
        });

      }else {
        const dialogRef = this.dialog.open(FormStructComponent, {
          width: '600px',
          height: '430px',
          data: {
            idUnite : this.uniteFound.idUnite,
            libeleCourt : this.uniteFound.libeleCourt, adresse : this.uniteFound.adresse, email : this.uniteFound.email,
            structures : this.structures, typeUnites : this.typeUnites, chercheurs : this.chercheurs,
            structure : this.uniteFound.structure.libeleCourt,
            typeUnite : this.uniteFound.typeUniteRecherche.libeleCourt,
            chercheur : this.uniteFound.responsable.email
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.unite = {idUnite : result.idUnite, libeleCourt : result.libeleCourt, email : result.email, adresse : result.adresse}
          console.log("unitee :", this.unite)
          console.log("Dialog result: ",result);
          this.saveUnite(this.unite, result.typeUnite, result.structure, result.chercheur,'Modification réussie')
        });
      }
  }, 100);
  }

  onlisteUnites() {
    this.show = 'listunites'
  }
}
