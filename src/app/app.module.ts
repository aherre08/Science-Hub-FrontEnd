import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { ScientistModule } from './scientist/scientist.module';

// Importa los módulos necesarios de AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { OrganizationModule } from './organization/organization.module';
import { AdministratorModule } from './administrator/administrator.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    AccountModule,
    ScientistModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    OrganizationModule,
    AdministratorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
