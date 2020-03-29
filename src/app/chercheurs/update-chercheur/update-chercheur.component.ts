import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/services/confirmation-dialog.service';
import { ChercheurService } from 'src/services/chercheur.service';
import { StructureService } from 'src/services/structure.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormChercheurComponent } from '../form-chercheur/form-chercheur.component';
import { Thematique } from 'src/model/Thematique';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-chercheur',
  templateUrl: './update-chercheur.component.html',
  styleUrls: ['./update-chercheur.component.css']
})
export class UpdateChercheurComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formGroup: FormGroup;
  isEditable = false;

  thematiques : any
  fonctions : any
  grades : any
  statuts : any
  diplomes : any
  structures : any
  unites : any
  chercheurs:any
  thematiquesChercheur: Array<any> = []

  constructor(private _formBuilder: FormBuilder,
              private confirmationDialogService: ConfirmationDialogService,
              private chercheurService : ChercheurService,
              private structureService : StructureService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FormChercheurComponent>,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.getUnites()
    this.getStructures()
    this.getThematiques()
    this.getFonctions()
    this.getGrades()
    this.getStatuts()

    this.data.thematiques.forEach(element => {
      this.thematiquesChercheur.push(element.libeleCourt)
    });
    console.log('thematiquesChercheur : ', this.thematiquesChercheur);


    console.log('date format : ', this.data.ne_le == "" ? "" : this.datePipe.transform(this.data.ne_le, 'dd-MM-yyyy'));


    this.firstFormGroup = this._formBuilder.group({
      prenom: [this.data.prenom, Validators.required],
      nom: [this.data.nom, Validators.required],
      email: [this.data.email, Validators.required],
      ne_le: [this.data.ne_le == "" ? "" : this.datePipe.transform(this.data.ne_le, 'yyyy-MM-dd'), Validators.required],
      lieu_de_naissance: [this.data.lieu_de_naissance, Validators.required],
      nationalite: [this.data.nationalite, Validators.required],
      adresse_perso: [this.data.adresse_perso, Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      lcThematique: [this.thematiquesChercheur, Validators.required],
      lcFonction: [this.data.fonction.libeleCourt, Validators.required],
      lcGrade: [this.data.grade.libeleCourt, Validators.required],
      lcStatut: [this.data.statut.libeleCourt, Validators.required],
      lcStructure: ['', Validators.required],
      lcUniteRecherche: ['', Validators.required],
    });
    this.formGroup = this._formBuilder.group({
      firstFormGroup: ['', Validators.required],
      secondFormGroup: ['', Validators.required],
    });
  }
  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  form1(){
    console.log('form 1',this.firstFormGroup.value);
  }

  form2(){
    console.log('form 2',this.secondFormGroup.value);
    this.formGroup.setValue({firstFormGroup: this.firstFormGroup.value, secondFormGroup: this.secondFormGroup.value})
    console.log('formGroup : ',this.formGroup.value)
  }

  onSubmit(): void {
    if (this.firstFormGroup.invalid && this.secondFormGroup.invalid) {
      console.log('invalid form')
      return;
    }

    this.confirmationDialogService.confirm('Confirmation...', 'Veuillez confirmer ?')
        .then((confirmed) =>{
            if (confirmed){
              this.dialogRef.close(this.formGroup.value);
            }else {
              console.log("annuler")
            }
          }
        )
        .catch(() =>
          console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
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

}
