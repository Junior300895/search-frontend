import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/services/confirmation-dialog.service';
import { ChercheurService } from 'src/services/chercheur.service';
import { StructureService } from 'src/services/structure.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-form-chercheur',
  templateUrl: './form-chercheur.component.html',
  styleUrls: ['./form-chercheur.component.css']
})
export class FormChercheurComponent implements OnInit {

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

  constructor(private _formBuilder: FormBuilder,
              private confirmationDialogService: ConfirmationDialogService,
              private chercheurService : ChercheurService,
              private structureService : StructureService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FormChercheurComponent>,) { }

  ngOnInit() {
    this.getUnites()
    this.getStructures()
    this.getThematiques()
    this.getFonctions()
    this.getGrades()
    this.getStatuts()

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
    this.formGroup = this._formBuilder.group({
      firstFormGroup: ['', Validators.required],
      secondFormGroup: ['', Validators.required],
    });
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
