import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {ConfirmationDialogService} from '../../services/confirmation-dialog.service';
import {AppUser} from '../../model/AppUser';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../services/notification-service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  appUser : AppUser = new AppUser();
  users : AppUser[];
  roles : any
  show : any
  succes : any = false
  rolesSelected : Array<string>

  registerForm: FormGroup;
  submitted = false;

  displayedColumns: string[] = [
    'prenom', 'nom', 'email', 'roles','action'
  ];
  dataSource : any
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private usersService : UsersService, private notificationService: NotificationService,
              private confirmationDialogService: ConfirmationDialogService) {
    //this._setSearchSubscription ();
  }

  ngOnInit() {
    this.getUsers()
    this.show='list-user'
    this.listRoles()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onListUser(){
    this.show = 'list-user'
    this.succes = false
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
  saveUser(){
    console.log(this.appUser)
    console.log(this.rolesSelected)
    this.usersService.saveUser(this.appUser, this.rolesSelected).subscribe(
      data=>{
        console.log(data)
        this.getUsers()
        this.notificationService.success("Compte créé !!!")
      }, error1 => {
        console.log(error1)
      }
    )
  }
  onSaveUser() {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous ajouter ce compte ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.saveUser()
            console.log("save")
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  onCreateUser(){
    this.show = 'create-user'
    this.appUser = new AppUser()
    this.succes = false
  }
  listRoles(){
    this.usersService.getRessource("http://localhost:8080/appRoles/").subscribe(
      data=>{
        this.roles = data
        console.log(data)
      }, error1 => {
        console.log(error1)
      }
    )
  }

  deleteUser(email: string) {
    this.usersService.deleteAppUser(email).subscribe(
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
  }

  onDeleteUser(mail: string) {
    this.confirmationDialogService.confirm('Confirmation...', 'Voulez-vous supprimer ce compte ?')
      .then((confirmed) =>{
          console.log('User confirmed:', confirmed);
          if (confirmed){
            this.deleteUser(mail)
          }else {
            console.log("annuler")
          }
        }
      )
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }

  onModifyUser(mail: string) {
    this.onCreateUser()
    this.usersService.getUser(mail).subscribe(
      (data : AppUser) => {
        console.log("get user => ",data)
        this.appUser = data
      }, error => {
        console.log(error)
      }
    )
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
