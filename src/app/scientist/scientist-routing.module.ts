import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { SearchPublicationComponent } from './search-publication/search-publication.component';

const routes: Routes = [
  { path: 'create-publication', component: CreatePublicationComponent },
  { path:'my-publications', component: MyPublicationsComponent },
  { path:'search-publication', component: SearchPublicationComponent},
  { path: '', redirectTo: 'create-publication', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScientistRoutingModule { }
