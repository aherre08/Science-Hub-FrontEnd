import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'login', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'scientist', loadChildren: () => import('./scientist/scientist.module').then(m => m.ScientistModule)},
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
