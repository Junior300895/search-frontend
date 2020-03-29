import {Component, OnInit, ViewChild} from '@angular/core';
import {Chercheur} from '../../model/Chercheur';
import {ChercheurService} from '../../services/chercheur.service';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { FormChercheurComponent } from './form-chercheur/form-chercheur.component';
import { FormGroup } from '@angular/forms';
import { NotificationService } from 'src/services/notification-service';
import { UpdateChercheurComponent } from './update-chercheur/update-chercheur.component';

@Component({
  selector: 'app-chercheurs',
  templateUrl: './chercheurs.component.html',
  styleUrls: ['./chercheurs.component.css']
})
export class ChercheursComponent implements OnInit {

  lcUniteRecherche : string;

  displayedColumns: string[] = [
    'prenom', 'nom', 'email', 'ne_le','lieu_naiss','action',
  ];
  dataSource : any
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private chercheurService : ChercheurService,
              private confirmationDialogService: ConfirmationDialogService,
              private dialog: MatDialog,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.getChercheurs()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getChercheurs(){
    this.chercheurService.findAllChercheurs().subscribe(
      (data:Chercheur[]) => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }
  onDeleteChercheur(id : string) {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer ce compte ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.chercheurService.deleteChercheur(id).subscribe(
              data => {
                  this.getChercheurs()
                  this.notificationService.warn('Compte supprimé avec succès')
              }, error => {
                console.log(error)
              }
            )
          }else {
            console.log("annuler")
          }}
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  onModify(chercheur : Chercheur) {
    const dialogRef = this.dialog.open(UpdateChercheurComponent, {
      width: '800px',
      height: '500px',
      data: {} = chercheur
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ",result);
      let checheur : Chercheur = new Chercheur()
      checheur = result.firstFormGroup
      this.chercheurService.updateChercheur(result.firstFormGroup, result.secondFormGroup.lcThematique,
        result.secondFormGroup.lcFonction, result.secondFormGroup.lcGrade,
        result.secondFormGroup.lcStatut, result.secondFormGroup.lcStructure,
        result.secondFormGroup.lcUniteRecherche).subscribe(
       data => {
        this.notificationService.success('Chercheur mis à jour avec succès')
         this.getChercheurs()
         console.log(data)
       }, error => {
         console.log(error)
       }
     )
    });
  }

  onAddChercheur() {
    const dialogRef = this.dialog.open(FormChercheurComponent, {
      width: '600px',
      height: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ",result);
      let checheur : Chercheur = new Chercheur()
      checheur = result.firstFormGroup
      this.chercheurService.saveChercheur(result.firstFormGroup, result.secondFormGroup.lcThematique,
        result.secondFormGroup.lcFonction, result.secondFormGroup.lcGrade,
        result.secondFormGroup.lcStatut, result.secondFormGroup.lcStructure,
        result.secondFormGroup.lcUniteRecherche).subscribe(
       data => {
        this.notificationService.success('Compte mis à jour avec succès')
         this.getChercheurs()
         console.log(data)
       }, error => {
         console.log(error)
       }
     )
    });
  }
}
