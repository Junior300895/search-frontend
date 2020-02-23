import {Component, OnInit, ViewChild} from '@angular/core';
import {Chercheur} from '../../model/Chercheur';
import {ChercheurService} from '../../services/chercheur.service';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StructureService} from '../../services/structure.service';

@Component({
  selector: 'app-chercheurs',
  templateUrl: './chercheurs.component.html',
  styleUrls: ['./chercheurs.component.css']
})
export class ChercheursComponent implements OnInit {
  chercheur : Chercheur = new Chercheur();
  private succes: any = false;

  lcUniteRecherche : string;

  thematiques : any
  fonctions : any
  grades : any
  statuts : any
  diplomes : any
  structures : any
  unites : any
  chercheurs:any
  show:any

  displayedColumns: string[] = [
    'prenom', 'nom', 'email', 'ne_le','lieu_naiss','action',
  ];
  dataSource : any
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  constructor(private chercheurService : ChercheurService, private structureService : StructureService,
              private _formBuilder: FormBuilder,
              private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.getUnites()
    this.getStructures()
    this.getThematiques()
    this.getFonctions()
    this.getGrades()
    this.getStatuts()
    this.getChercheurs()
    this.show = 'listchercheur'

    this.firstFormGroup = this._formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      ne_le: ['', Validators.required],
      lieu_de_naissance: ['', Validators.required],
      nationalite: ['', Validators.required],
      adresse_perso: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      lcThematique: ['', Validators.required],
      lcFonction: ['', Validators.required],
      lcGrade: ['', Validators.required],
      lcStatut: ['', Validators.required],
      lcStructure: ['', Validators.required],
      lcUniteRecherche: ['', Validators.required],
    });
  }
  form1(){
    console.log(this.firstFormGroup.value);
  }

  form2(){
    console.log(this.secondFormGroup.value);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  saveChercheur(){
    console.log("save1 :",this.firstFormGroup.value);
    console.log("save2 :",this.secondFormGroup.value);
    // this.chercheurService.saveChercheur(this.chercheur, this.chercheur.lcThematique, this.chercheur.fonction.libeleCourt,
    //   this.chercheur.grade.libeleCourt, this.chercheur.statut.libeleCourt, this.chercheur.lcStructure, this.chercheur.lcUniteRecherche).subscribe(
     this.chercheurService.saveChercheur(this.firstFormGroup.value, this.secondFormGroup.value.lcThematique,
       this.secondFormGroup.value.lcFonction, this.secondFormGroup.value.lcGrade,
       this.secondFormGroup.value.lcStatut, this.secondFormGroup.value.lcStructure,
       this.secondFormGroup.value.lcUniteRecherche).subscribe(
      data => {
        this.succes = true
        this.getChercheurs()
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }
  public onSaveChercheur() {
    console.log("ons : "+this.lcUniteRecherche)
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous ajouter un chercheur ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.saveChercheur()
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
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

  getUnites(){
    this.structureService.findAllUnites().subscribe(
      data=>{
        this.unites = data
        console.log(data)
      },error => {
        console.log(error)
      }
    )
  }
  getStructures(){
    this.structureService.findAllStructures().subscribe(
      data=>{
        this.structures = data
        console.log(data)
      },error => {
        console.log(error)
      }
    )
  }
  getThematiques(){
    this.chercheurService.findAllThematiques().subscribe(
      data=>{
        this.thematiques = data
        console.log(data)
      },error => {
        console.log(error)
      }
    )
  }
  getFonctions(){
    this.chercheurService.findAllFonctions().subscribe(
      data=>{
        this.fonctions = data
        console.log(data)
      },error => {
        console.log(error)
      }
    )
  }
  getGrades(){
    this.chercheurService.findAllGrades().subscribe(
      data=>{
        this.grades = data
        console.log(data)
      },error => {
        console.log(error)
      }
    )
  }
  getStatuts(){
    this.chercheurService.findAllStatuts().subscribe(
      data=>{
        this.statuts = data
        console.log(data)
      },error => {
        console.log(error)
      }
    )
  }


  onFormSubmit(chercheur: Chercheur) {
    console.log(this.chercheur.lcUniteRecherche)
  }

  onListChercheur() {
    this.show = 'listchercheur'
    this.succes = false
  }

  onFormChercheur() {
    this.show = 'formchercheur'
    this.chercheur = new Chercheur();
    this.succes = false
  }

  deleteChercheur(id : string) {
    this.chercheurService.deleteChercheur(id).subscribe(
      data => {
        console.log(data)
        if(data!=null){
          this.succes='deletesuccess'
          this.getChercheurs()
        }
      }, error => {
        console.log(error)
      }
    )
  }
  onDeleteChercheur(id : string) {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer ce chercheur ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.deleteChercheur(id)
            //console.log(this.chercheur.lcUniteRecherche)
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  onModify(email: string) {
    this.onFormChercheur()
    this.chercheurService.findChercheurByEmail(email).subscribe(
      (data : Chercheur) => {
        console.log("get chercheur => ",data)
        this.chercheur = data
      }, error => {
        console.log(error)
      }
    )
  }
}
