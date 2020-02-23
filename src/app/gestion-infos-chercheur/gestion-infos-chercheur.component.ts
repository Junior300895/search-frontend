import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {InfosChercheur} from '../../services/infos-chercheur';
import {FormComponent} from './form/form.component';
import {NotificationService} from '../../services/notification-service';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-gestion-infos-chercheur',
  templateUrl: './gestion-infos-chercheur.component.html',
  styleUrls: ['./gestion-infos-chercheur.component.css']
})
export class GestionInfosChercheurComponent implements OnInit {

  dataSourceThematique: any;
  dataSourceFonction: any;
  dataSourceGrade: any;
  dataSourceStatut: any;

  type: any;
  libele: any;

  displayedColumns: string[] = ['libeleCourt','actions'];

  @ViewChild('paginatorth', {static: true}) paginatorth: MatPaginator;
  @ViewChild('paginatorfct', {static: true}) paginatorfct: MatPaginator;
  @ViewChild('paginatorgrad', {static: true}) paginatorgrad: MatPaginator;
  @ViewChild('paginatorstat', {static: true}) paginatorstat: MatPaginator;

  private dataUpdate: any;

  constructor(private infosChercheur : InfosChercheur, private notificationService: NotificationService,
              private dialog: MatDialog, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.getThematiques()
    this.getFonctions()
    this.getGrades()
    this.getStatuts()
  }

  getThematiques(){
    this.infosChercheur.getThematiques().subscribe(
      data =>{
        this.dataSourceThematique = new MatTableDataSource();
        this.dataSourceThematique.data = data
        this.dataSourceThematique.paginator = this.paginatorth;
        console.log("thematiques : ",data)
      }, error => {
        console.log(error)
      }
    )
  }
  getFonctions(){
    this.infosChercheur.getFonctions().subscribe(
      data =>{
        this.dataSourceFonction = new MatTableDataSource();
        this.dataSourceFonction.data = data
        this.dataSourceFonction.paginator = this.paginatorfct;
        console.log("fonctions : ",data)
      }, error => {
        console.log(error)
      }
    )
  }
  getGrades(){
    this.infosChercheur.getGrades().subscribe(
      data =>{
        this.dataSourceGrade = new MatTableDataSource();
        this.dataSourceGrade.data = data
        this.dataSourceGrade.paginator = this.paginatorgrad;
        console.log("grades : ",data)
      }, error => {
        console.log(error)
      }
    )
  }
  getStatuts(){
    this.infosChercheur.getStatuts().subscribe(
      data =>{
        this.dataSourceStatut = new MatTableDataSource();
        this.dataSourceStatut.data = data
        this.dataSourceStatut.paginator = this.paginatorstat;
        console.log("statuts : ",data)
      }, error => {
        console.log(error)
      }
    )
  }

  /**
   * Save all infos
   */
  saveThematique(libele:string){
    this.infosChercheur.saveThematique(libele).subscribe(
      data => {
        this.getThematiques()
        console.log("save Thematique",data)
      }, error => {
        console.log(error)
      }
    )
  }
  saveFonction(libele:string){
    this.infosChercheur.saveFonction(libele).subscribe(
      data => {
        this.getFonctions()
        console.log("save fonction",data)
      }, error => {
        console.log(error)
      }
    )
  }
  saveGrade(libele:string){
    this.infosChercheur.saveGrade(libele).subscribe(
      data => {
        this.getGrades()
        console.log("save grade",data)
      }, error => {
        console.log(error)
      }
    )
  }
  saveStatut(libele:string){
    this.infosChercheur.saveStatut(libele).subscribe(
      data => {
        this.getStatuts()
        console.log("save statut",data)
      }, error => {
        console.log(error)
      }
    )
  }

  /**
   * Delete all infos
   */
  deleteThematique(libele:string){
    this.infosChercheur.deleteThematique(libele).subscribe(
      data => {
        this.getThematiques()
        this.notificationService.warn('! Suppression réussie')
        console.log("delete theme",data)
      }, error => {
        console.log(error)
      }
    )
  }
  deleteFonction(libele:string){
    this.infosChercheur.deleteFonction(libele).subscribe(
      data => {
        this.getFonctions()
        this.notificationService.warn('! Suppression réussie')
        console.log("delete fonction",data)
      }, error => {
        console.log(error)
      }
    )
  }
  deleteGrade(libele:string){
    this.infosChercheur.deleteGrade(libele).subscribe(
      data => {
        this.getGrades()
        this.notificationService.warn('! Suppression réussie')
        console.log("delete grade",data)
      }, error => {
        console.log(error)
      }
    )
  }
  deleteStatut(libele:string){
    this.infosChercheur.deleteStatut(libele).subscribe(
      data => {
        this.getStatuts()
        this.notificationService.warn('! Suppression réussie')
        console.log("delete statut",data)
      }, error => {
        console.log(error)
      }
    )
  }

  /**
   * Find all infos
   */
  findThematique(libele:string){
    this.infosChercheur.findThematiqueByLc(libele).subscribe(
      data => {
        this.dataUpdate = data
        console.log("dataUpdate :",data)
      }, error => {
        console.log(error)
      }
    )
  }
  async findThematiquee(libele : string) {
    this.dataUpdate = await this.infosChercheur.findThematiqueByLc(libele).toPromise();
  }

  findFonction(libele:string){
    this.infosChercheur.findFonctionByLc(libele).subscribe(
      data => {
        this.dataUpdate = data
        console.log("dataUpdate :",data)
      }, error => {
        console.log(error)
      }
    )
  }

  findGrade(libele:string){
    this.infosChercheur.findGradeByLc(libele).subscribe(
      data => {
        this.dataUpdate = data
        console.log("dataUpdate :",data)
      }, error => {
        console.log(error)
      }
    )
  }

  findStatut(libele:string){
    this.infosChercheur.findStatutByLc(libele).subscribe(
      data => {
        this.dataUpdate = data
        console.log("dataUpdate :",data)
      }, error => {
        console.log(error)
      }
    )
  }

  /**
   * Update infos
   */
  updateThematique(id :number, libele : string){
    this.infosChercheur.updateThematiqueByLc(id, libele).subscribe(
      data => {
        this.getThematiques()
      }, error => {
        console.log(error)
      }
    )
  }
  updateFonction(id :number, libele : string){
    this.infosChercheur.updateFonctionByLc(id, libele).subscribe(
      data => {
        this.getFonctions()
      }, error => {
        console.log(error)
      }
    )
  }
  updateGrade(id :number, libele : string){
    this.infosChercheur.updateGradeByLc(id, libele).subscribe(
      data => {
        this.getGrades()
      }, error => {
        console.log(error)
      }
    )
  }
  updateStatut(id :number, libele : string){
    this.infosChercheur.updateStatutByLc(id, libele).subscribe(
      data => {
        this.getStatuts()
      }, error => {
        console.log(error)
      }
    )
  }

  /**
   * Event sur les buttons delete
   */
  public onDeleteThematique(libele : string) {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer cet élément ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.deleteThematique(libele)
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  public onDeleteFonction(libele : string) {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer cet élément ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.deleteFonction(libele)
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  public onDeleteGrade(libele : string) {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer cet élément ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.deleteGrade(libele)
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  public onDeleteStatut(libele : string) {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer cet élément ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.deleteStatut(libele)
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  onFormInfo() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '600px',
      height: '400px',
      data: {id: null, libele: this.libele, type: this.type}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ",result);

      if(result.type === 'Thematique'){
        this.saveThematique(result.libele)
        this.notificationService.success(' Ajout réussi');

      }else if(result.type === 'Fonction'){
        this.saveFonction(result.libele)
        this.notificationService.success(' Ajout réussi');

      }else if(result.type === 'Grade'){
        this.saveGrade(result.libele)
        this.notificationService.success(' Ajout réussi');

      }else if(result.type === 'Statut'){
        this.saveStatut(result.libele)
        this.notificationService.success(' Ajout réussi');
      }
    });
  }

  onModifyThematique(libele : string) {
    this.findThematique(libele)
    // setTimeout est utlisé pour permettre à ce que la valeur de dataUpdate
    // puisse recevoir les données depuis la méthode findThematique avant
    // de faire appel à elle même

    setTimeout (() => {
      console.log("dataUpdate2 :",this.dataUpdate)
      const dialogRef = this.dialog.open(FormComponent, {
        width: '600px',
        height: '400px',
        data: {id: this.dataUpdate.idThematique, libele: this.dataUpdate.libeleCourt, type: "Thematique"}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: ",result);

        if(result.type === 'Thematique'){
          console.log("id :", result.id, "lib :", result.libele)
          this.updateThematique(result.id, result.libele)
          this.notificationService.success(' Modification réussie');
        }
      });
    }, 100);
  }

  onModifyFonction(libele : string) {
    this.findFonction(libele)
    // setTimeout est utlisé pour permettre à ce que la valeur de dataUpdate
    // puisse recevoir les données depuis la méthode findThematique avant
    // de faire appel à elle même
    setTimeout (() => {
      console.log("dataUpdate2 :",this.dataUpdate)
      const dialogRef = this.dialog.open(FormComponent, {
        width: '600px',
        height: '400px',
        data: {id: this.dataUpdate.idFonction, libele: this.dataUpdate.libeleCourt, type: "Fonction"}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: ",result);
        if(result.type === 'Fonction'){
          console.log("id :", result.id, "lib :", result.libele)
          this.updateFonction(result.id, result.libele)
          this.notificationService.success(' Modification réussie');
        }
      });
    }, 100);
  }

  onModifyGrade(libele : string) {
    this.findGrade(libele)
    // setTimeout est utlisé pour permettre à ce que la valeur de dataUpdate
    // puisse recevoir les données depuis la méthode findThematique avant
    // de faire appel à elle même
    setTimeout (() => {
      console.log("dataUpdate2 :",this.dataUpdate)
      const dialogRef = this.dialog.open(FormComponent, {
        width: '600px',
        height: '400px',
        data: {id: this.dataUpdate.idGrade, libele: this.dataUpdate.libeleCourt, type: "Grade"}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: ",result);
        if(result.type === 'Grade'){
          console.log("id :", result.id, "lib :", result.libele)
          this.updateGrade(result.id, result.libele)
          this.notificationService.success(' Modification réussie');
        }
      });
    }, 100);
  }

  onModifyStatut(libele : string) {
    this.findStatut(libele)
    // setTimeout est utlisé pour permettre à ce que la valeur de dataUpdate
    // puisse recevoir les données depuis la méthode findThematique avant
    // de faire appel à elle même
    setTimeout (() => {
      console.log("dataUpdate2 :",this.dataUpdate)
      const dialogRef = this.dialog.open(FormComponent, {
        width: '600px',
        height: '400px',
        data: {id: this.dataUpdate.idStatut, libele: this.dataUpdate.libeleCourt, type: "Statut"}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog result: ",result);
        if(result.type === 'Statut'){
          console.log("id :", result.id, "lib :", result.libele)
          this.updateStatut(result.id, result.libele)
          this.notificationService.success(' Modification réussie');
        }
      });
    }, 100);
  }
}
