import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductionComponent} from './production/production.component';
import {GestionProductionComponent} from './gestion-production/gestion-production.component';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {ChercheursComponent} from './chercheurs/chercheurs.component';
import {GestionInfosChercheurComponent} from './gestion-infos-chercheur/gestion-infos-chercheur.component';
import {StructureComponent} from './structure/structure.component';
import {AppeloffreComponent} from './appeloffre/appeloffre.component';

const routes: Routes = [
  // {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: "production/:id", component: ProductionComponent},
  {path: 'productions/:Tp', component: GestionProductionComponent},
  {path: "login", component: LoginComponent},
  {path: 'appeloffre', component: AppeloffreComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'app', component: AppComponent},
  {path: 'chercheurs', component: ChercheursComponent},
  {path: 'infos-chercheurs', component: GestionInfosChercheurComponent},
  {path: 'structures', component: StructureComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
