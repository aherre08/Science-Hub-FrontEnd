import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { PublishProjectComponent } from './publish-project/publish-project.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { SearchProjectComponent } from './search-project/search-project.component';
import { SearchScientistComponent } from './search-scientist/search-scientist.component';
import { SuggestScientistsComponent } from './suggest-scientists/suggest-scientists.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ShowScientistComponent } from './show-scientist/show-scientist.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    PublishProjectComponent,
    MyProjectsComponent,
    SearchProjectComponent,
    SearchScientistComponent,
    SuggestScientistsComponent,
    EditProjectComponent,
    ShowScientistComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule

  ]
})
export class OrganizationModule { }
