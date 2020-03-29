import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmationDialogService } from 'src/services/confirmation-dialog.service';
import { UsersService } from 'src/services/users.service';
import { Role } from 'src/model/role';

@Component({
  selector: 'app-update',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  form: FormGroup;
  roles : any
  rolesChercheur: Array<any> = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<UpdateUserComponent>,
  private confirmationDialogService: ConfirmationDialogService,
  private _formBuilder: FormBuilder,
  private usersService : UsersService,) { }

  ngOnInit() {
    this.listRoles()

    this.data.roles.forEach(element => {
      this.rolesChercheur.push(element.roleName)
    });
    console.log('rolesChercheur : ', this.rolesChercheur);

    this.form = this._formBuilder.group({
      prenom: [this.data.prenom, Validators.required],
      nom: [this.data.nom, Validators.required],
      mail: [this.data.mail, Validators.email],
      rolesSelected: [this.rolesChercheur, Validators.required],
    });

  }

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
  listRoles(){
    this.usersService.getRessource("http://localhost:9101/roles/").subscribe(
      data=>{
        this.roles = data
        console.log(data)
      }, error1 => {
        console.log(error1)
      }
    )
  }
}
