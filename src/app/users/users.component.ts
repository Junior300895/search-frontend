import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';
import {AppUser} from '../../model/AppUser';
import {FormGroup} from '@angular/forms';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import {NotificationService} from '../../services/notification-service';
import { FormUsersComponent } from './form-users/form-users.component';
import { UpdateUserComponent } from './update/update-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  appUser : AppUser = new AppUser();
  users : AppUser[];
  rolesSelected : Array<string>

  registerForm: FormGroup;
  submitted = false;

  displayedColumns: string[] = [
    'prenom', 'nom', 'email', 'roles','action'
  ];
  dataSource : any
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private usersService : UsersService, private notificationService: NotificationService,
              private confirmationDialogService: ConfirmationDialogService,
              private dialog: MatDialog) {
    //this._setSearchSubscription ();
  }

  ngOnInit() {
    this.getUsers()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getUsers(){
    this.usersService.getUsers().subscribe(
      (data:AppUser[])=>{
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
        console.log(data)
      }, error1 => {
        console.log("get users=> ",error1);
      }
    )
  }
  onDeleteUser(mail: string) {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer ce compte ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.usersService.deleteAppUser(mail).subscribe(
              data => {
                console.log(data)
                if(data!=null){
                  this.notificationService.warn("Compte supprimé !!!")
                  this.getUsers()
                }
              }, error => {
                console.log(error)
              }
            )
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  onModifyUser(utilisateur : AppUser) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '600px',
      height: '500px',
      data: {} = utilisateur
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ",result);
      let appUser : AppUser = new AppUser()
      appUser.prenom = result.prenom
      appUser.nom = result.nom
      appUser.mail = result.mail

      console.log('appUser dans userform =>', appUser);
      this.usersService.updateUser(appUser, result.mail, result.rolesSelected).subscribe(
        data=>{
          this.notificationService.success('Compte mis à jour avec succès')
          this.getUsers()
        },error=>{
          console.log(error);

        }
      )
    });

  }

  onAddUser() {
    const dialogRef = this.dialog.open(FormUsersComponent, {
      width: '600px',
      height: '500px',
      data: {appUser: this.appUser, rolesSelected: this.rolesSelected}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ",result);
      let appUser : AppUser = new AppUser()
      appUser.prenom = result.prenom
      appUser.nom = result.nom
      appUser.mail = result.mail
      appUser.password = result.password

      console.log('appUser dans userform =>', appUser);

      this.usersService.saveUser(appUser, result.rolesSelected).subscribe(
        data=>{
          console.log(data)
          this.getUsers()
          this.notificationService.success("Compte créé !!!")
        }, error1 => {
          console.log(error1)
        }
      )
    });
  }


  /*
 Autosuggestion search
*/
  // create
  // private _searchSubject: Subject <string> = new Subject ();
  //
  // private _setSearchSubscription () {
  //   this._searchSubject.pipe (debounceTime (
  //     500),distinctUntilChanged()
  //   ).subscribe ((searchValue: any) => {
  //     this.usersService.getUsers().pipe(
  //       map(
  //         (appUsers: AppUser[]) => appUsers.filter(
  //           (appUser: AppUser) => (appUser.id == searchValue
  //             || '' === searchValue
  //             || appUser.mail.toLowerCase().includes(searchValue.valueOf().toLowerCase())
  //             || appUser.nom.toLowerCase().includes(searchValue.valueOf().toLowerCase())
  //             || appUser.prenom.toLowerCase().includes(searchValue.valueOf().toLowerCase()))
  //         ))).subscribe(
  //       (appUsers: AppUser[]) => {
  //         this.users = appUsers;
  //       }
  //     ); //appUser.mail.startsWith(searchValue) ||
  //   });
  // }
  // method called on the input button to listen
  // public updateSearch (searchTextValue: string) {
  //   this._searchSubject.next (searchTextValue);
  // }
  // ngOnDestroy () {
  //   this._searchSubject.unsubscribe ();
  // }
}
