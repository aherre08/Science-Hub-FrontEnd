import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientistRoutingModule } from './scientist-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { SearchPublicationComponent } from './search-publication/search-publication.component';
import { SearchOrganizationComponent } from './search-organization/search-organization.component';
import { SuggestProjectsComponent } from './suggest-projects/suggest-projects.component';
import { EditPublicationComponent } from './edit-publication/edit-publication.component';
import { ShowProjectComponent } from './show-project/show-project.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { HomeComponent } from './home/home.component'; 


@NgModule({
  declarations: [
    CreatePublicationComponent,
    MyPublicationsComponent,
    SearchPublicationComponent,
    SearchOrganizationComponent,
    SuggestProjectsComponent,
    EditPublicationComponent,
    ShowProjectComponent,
    MyProjectComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ScientistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
})
export class ScientistModule { }
