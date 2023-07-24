import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { MyPublicationsComponent } from './my-publications/my-publications.component';

const routes: Routes = [
  { path: 'create-publication', component: CreatePublicationComponent },
  { path:'my-publications', component: MyPublicationsComponent },
  { path: '', redirectTo: 'create-publication', pathMatch: 'full' }, // Ruta predeterminada dentro de ScientistModule
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScientistRoutingModule { }
