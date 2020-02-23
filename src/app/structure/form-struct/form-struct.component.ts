import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-form-struct',
  templateUrl: './form-struct.component.html',
  styleUrls: ['./form-struct.component.css']
})
export class FormStructComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormStructComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
