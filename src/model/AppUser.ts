export class AppUser {
  id : number;
  mail : string;
  username : string;
  password : string;
  actived : boolean;
  statut : string;
  prenom : string;
  nom : string;
  roles : [{
    id:number,
    roleName:string
  }]
}
