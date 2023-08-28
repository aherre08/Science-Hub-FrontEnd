import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HelpFaqComponent } from './help-faq/help-faq.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ViewProfileComponent,
    EditProfileComponent,
    HelpFaqComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
