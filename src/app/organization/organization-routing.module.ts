import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishProjectComponent } from './publish-project/publish-project.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { SearchProjectComponent } from './search-project/search-project.component';
import { SearchScientistComponent } from './search-scientist/search-scientist.component';
import { SuggestScientistsComponent } from './suggest-scientists/suggest-scientists.component';



const routes: Routes = [
  { path: 'publish-project', component: PublishProjectComponent },
  { path:'my-projects', component:MyProjectsComponent },
  { path: 'search-project', component:SearchProjectComponent },
  { path: 'search-scientist', component:SearchScientistComponent },
  { path: 'suggest-scientists', component:SuggestScientistsComponent },
  { path: '', redirectTo: 'publish-project', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
