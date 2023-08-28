import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPublicationsComponent } from './list-publications/list-publications.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { EditPublicationComponent } from './edit-publication/edit-publication.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [    
  {path:'home', component:HomeComponent},
  {path: '', component: HomeComponent},
  {path:'edit-publication/:publicationId', component:EditPublicationComponent},
  {path:'list-publications', component: ListPublicationsComponent},
  {path:'edit-user/:type/:id', component:EditUserComponent},
  {path:'list-users', component: ListUsersComponent},
  {path:'edit-project/:projectId', component:EditProjectComponent},
  {path:'list-projects', component: ListProjectsComponent},
  {path: '**', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule {}
