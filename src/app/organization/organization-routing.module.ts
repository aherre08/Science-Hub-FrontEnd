import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishProjectComponent } from './publish-project/publish-project.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { SearchProjectComponent } from './search-project/search-project.component';
import { SearchScientistComponent } from './search-scientist/search-scientist.component';
import { SuggestScientistsComponent } from './suggest-scientists/suggest-scientists.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ShowScientistComponent } from './show-scientist/show-scientist.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {path:'home', component:HomeComponent},
  { path: 'publish-project', component: PublishProjectComponent },
  { path:'my-projects', component:MyProjectsComponent },
  { path:'edit-project/:projectId', component:EditProjectComponent},
  { path: 'search-project', component:SearchProjectComponent },
  { path: 'search-scientist', component:SearchScientistComponent },
  { path: 'suggest-scientists', component:SuggestScientistsComponent },
  { path:'show-scientist/:orcid', component:ShowScientistComponent },
  { path: '', redirectTo: 'publish-project', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
