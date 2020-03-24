import { Role } from './role';

export class AppUser {
  id : number;
  mail : string;
  username : string;
  password : string;
  actived : boolean;
  statut : string;
  prenom : string;
  nom : string;
  roles : Role
}
