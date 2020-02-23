import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-details-production',
  templateUrl: './details-production.component.html',
  styleUrls: ['./details-production.component.css']
})
export class DetailsProductionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetailsProductionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


}
