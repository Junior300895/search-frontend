import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmationDialogService } from 'src/services/confirmation-dialog.service';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { AppUser } from 'src/model/AppUser';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css']
})
export class FormUsersComponent implements OnInit {

  form: FormGroup;
  rolesSelected: Array<string>
  hide = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FormUsersComponent>,
              private confirmationDialogService: ConfirmationDialogService,
              private _formBuilder: FormBuilder,) {
    this.form = data
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      mail: ['', Validators.email],
      password: ['', Validators.required],
      rolesSelected: ['', Validators.required],
    });
  }
   /* Shorthands for form controls (used from within template) */
  //  get password1() { return this.form.get('password1'); }
  //  get password2() { return this.form.get('password2'); }

  // onPasswordInput() {
  //   if (this.form.hasError('passwordMismatch'))
  //     this.password2.setErrors([{'passwordMismatch': true}]);
  //   else
  //     this.password2.setErrors(null);
  // }
  public hasError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
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
            console.log('User confirmed:', confirmed);
            if (confirmed){
              console.log('form value => ',this.form.value);
              this.dialogRef.close(this.form.value);
              console.log('confirmation ok')
            }else {
              console.log("annuler")
            }
          }
        )
        .catch(() =>
          console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
