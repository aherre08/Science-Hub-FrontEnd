import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { SearchPublicationComponent } from './search-publication/search-publication.component';
import { SearchOrganizationComponent } from './search-organization/search-organization.component';
import { SuggestProjectsComponent } from './suggest-projects/suggest-projects.component';
import { EditPublicationComponent } from './edit-publication/edit-publication.component';

const routes: Routes = [
  { path: 'create-publication', component: CreatePublicationComponent },
  { path:'my-publications', component: MyPublicationsComponent },
  { path: 'edit-publication/:publicationId', component: EditPublicationComponent },
  { path:'search-publication', component: SearchPublicationComponent},
  {path:'search-organization', component: SearchOrganizationComponent},
  {path:'suggest-projects', component: SuggestProjectsComponent},
  { path: '', redirectTo: 'create-publication', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScientistRoutingModule { }
