import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { SearchPublicationComponent } from './search-publication/search-publication.component';
import { SearchOrganizationComponent } from './search-organization/search-organization.component';
import { SuggestProjectsComponent } from './suggest-projects/suggest-projects.component';
import { EditPublicationComponent } from './edit-publication/edit-publication.component';
import { ShowProjectComponent } from './show-project/show-project.component';
import { MyProjectComponent } from './my-project/my-project.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  { path: 'create-publication', component: CreatePublicationComponent },
  { path:'my-publications', component: MyPublicationsComponent },
  { path: 'edit-publication/:publicationId', component: EditPublicationComponent },
  { path:'search-publication', component: SearchPublicationComponent },
  { path:'search-organization', component: SearchOrganizationComponent },
  { path:'show-project/:projectId', component:ShowProjectComponent },
  { path:'suggest-projects', component: SuggestProjectsComponent },
  {path:'my-project', component:MyProjectComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScientistRoutingModule { }
