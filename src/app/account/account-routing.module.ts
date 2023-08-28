import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HelpFaqComponent } from './help-faq/help-faq.component';

const routes: Routes = [    
    {path: '', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'view-profile', component:ViewProfileComponent},
    {path:'edit-profile', component:EditProfileComponent},
    {path:'help-faq', component:HelpFaqComponent},
    {path: '**', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }