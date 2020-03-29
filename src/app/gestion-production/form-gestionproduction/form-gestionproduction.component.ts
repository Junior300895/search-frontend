import { Component, OnInit, Inject } from '@angular/core';
import { ChercheurService } from 'src/services/chercheur.service';
import { ConfirmationDialogService } from 'src/services/confirmation-dialog.service';
import { UploadService } from 'src/services/upload.service';
import { ProductionService } from 'src/services/production.service';
import { Thematique } from 'src/model/Thematique';
import { Production } from 'src/model/Production';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/services/notification-service';

@Component({
  selector: 'app-form-gestionproduction',
  templateUrl: './form-gestionproduction.component.html',
  styleUrls: ['./form-gestionproduction.component.css']
})
export class FormGestionproductionComponent implements OnInit {

  form: FormGroup;
  private uploadedFiles: any;
  private date: any

  production : Production = new Production();

  nomthematique : string
  typepub : string
  typepublications : any;
  typeproductionsbypub : any
  typeproductionsbycom : any
  thematiques : Thematique[];

  constructor(private chercheurservice : ChercheurService,
              private productionservice : ProductionService,
              private confirmationDialogService: ConfirmationDialogService,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FormGestionproductionComponent>,) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      production: this._formBuilder.group({
        libelelong: ['', Validators.required],
        revuelieu: ['', Validators.required],
        adresse: ['', Validators.required],
        directeurpub: ['', Validators.required],
        numvol: ['', Validators.required],
        pages: ['', Validators.required],

      }),

      infos:  this._formBuilder.group({
        typepub: ['', Validators.required],
        nomthematique: ['', Validators.required],
      })
    });

    this.getTypePublications()
    this.getTypeProductionsByCommunication()
    this.getTypeProductionsByPublication()
    this.listThematique()
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.date = new Date().valueOf()
    console.log("upload file : ",this.uploadedFiles,'name file : ', this.uploadedFiles[0].name)
    this.form.value.uploadedFiles = this.uploadedFiles
  }
  onCancel(){
    this.form.reset()
  }
  onSubmit(): void {
    if (this.form.invalid) {
      console.log('invalid form')
      return;
    }

    this.confirmationDialogService.confirm('Confirmation...', 'Veuillez confirmer ?')
        .then((confirmed) =>{
            if (confirmed){
              this.dialogRef.close(this.form.value);
            }else {
              console.log("annuler")
            }
          }
        )
        .catch(() =>
          console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
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
}
