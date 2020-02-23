import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  statut: any;
  grade: any;
  fonction: any;
  thematique: any;

  constructor(public dialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.dialogRef.close();
  }

  save() {

  }

  onClose() {
    this.dialogRef.close();
  }
}
