import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { ListPublicationsComponent } from './list-publications/list-publications.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { EditPublicationComponent } from './edit-publication/edit-publication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    ListPublicationsComponent,
    ListUsersComponent,
    ListProjectsComponent,
    EditPublicationComponent,
    EditProjectComponent,
    EditUserComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministratorModule { }
