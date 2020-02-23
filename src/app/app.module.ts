import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatIconRegistry, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatRadioModule, MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatStepperModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { ProductionComponent } from './production/production.component';
import { GestionProductionComponent } from './gestion-production/gestion-production.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ConfirmationDialogService} from '../services/confirmation-dialog.service';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {AppeldoffresService} from '../services/appeldoffres.service';
import {AuthenticationService} from './login/authentication.service';
import {ErrorInterceptor} from './login/ErrorInterceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users/users.component';
import {ChercheurService} from '../services/chercheur.service';
import { ChercheursComponent } from './chercheurs/chercheurs.component';
import { GestionInfosChercheurComponent } from './gestion-infos-chercheur/gestion-infos-chercheur.component';
import { FormComponent } from './gestion-infos-chercheur/form/form.component';
import { DetailsProductionComponent } from './production/details-production/details-production.component';
import {StructureComponent} from './structure/structure.component';
import { FormStructComponent } from './structure/form-struct/form-struct.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {AppeloffreComponent} from './appeloffre/appeloffre.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductionComponent,
    GestionProductionComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    UsersComponent,
    ChercheursComponent,
    GestionInfosChercheurComponent,
    FormComponent,
    DetailsProductionComponent,
    StructureComponent,
    FormStructComponent,
    AppeloffreComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule,
    MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule,
    MatSidenavModule, MatListModule, MatFormFieldModule, MatTableModule, MatPaginatorModule,
    MatNativeDateModule, MatDatepickerModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule,
    NgbModule.forRoot(), MatMenuModule, MatStepperModule, MatGridListModule, MatDialogModule,MatSnackBarModule,
    NgxMatSelectSearchModule,
  ],
  providers: [HttpClient,ConfirmationDialogService, AppeldoffresService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }

  ],
  entryComponents: [
    ConfirmationDialogComponent, FormComponent, DetailsProductionComponent, FormStructComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
