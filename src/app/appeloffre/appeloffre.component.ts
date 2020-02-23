import {Component, OnInit, ViewChild} from '@angular/core';
import {Appeloffre} from '../../model/Appeloffre';
import {Thematique} from '../../model/Thematique';
import {AppeldoffresService} from '../../services/appeldoffres.service';
import {ChercheurService} from '../../services/chercheur.service';
import {AuthenticationService} from '../login/authentication.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../services/notification-service';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-appeloffre',
  templateUrl: './appeloffre.component.html',
  styleUrls: ['./appeloffre.component.css']
})
export class AppeloffreComponent implements OnInit {
  appeloffre : Appeloffre = new Appeloffre();
  thematique : Thematique = new Thematique();
  appeloffres : any;
  thematiques : any;
  show;
  succes:boolean;

  displayedColumns: string[] = [
    'id', 'description', 'dateparution', 'datedepot','action'
  ];
  dataSource : any
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private appeloffreservice : AppeldoffresService,
              private chercheurservice : ChercheurService,private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.getAppeloffres()
    this.getThematiques()
    this.show = 'listappeloffres'
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getThematiques(){
    this.chercheurservice.findAllThematiques().subscribe(
      data=>{
        this.thematiques = data
        console.log(data)
      },error => {
        console.log(error)
      }
    )
  }
  onSaveAO(){
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous ajouter cette production ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.saveAO()
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }
  saveAO() {
    console.log("AO :", this.appeloffre,"thematique :", this.thematique)
    this.appeloffreservice.saveAppeloffre(this.appeloffre, this.thematique.libeleCourt).subscribe(
      data=>{
        console.log(data)
        this.getAppeloffres()
        this.notificationService.success("Ajout réussi");
      },error1 => {
        console.log(error1)
      })
  }
  onGetAppeldoffre(id : number){
    this.appeloffreservice.getAppeldoffre(id)
      .subscribe((data:Appeloffre)=>{
        this.appeloffre=data
        this.showForm()
      },error1 =>{
        console.log(error1)
      })
  }

  getAppeloffres(){
    this.appeloffreservice.listAppeloffre().subscribe(
      data=>{
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
        console.log(data);
      },error1 => {
        console.log(error1);
      }
    )
  }
  listThematique(){
    this.chercheurservice.listThematique().subscribe(
      data=>{
        this.thematiques = data
      },error1 => {
        console.log(error1)
      }
    )
  }

  onListeAppeloffre(){
    this.getAppeloffres()
    this.show='listappeloffres'
  }
  isAdmin(){
    console.log("admin ?? "+this.authenticationService.isAdmin());
    return this.authenticationService.isAdmin()
  }

  showForm() {
    this.show = 'formAO'
  }
}
