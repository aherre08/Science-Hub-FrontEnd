import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientistRoutingModule } from './scientist-routing.module';
import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CreatePublicationComponent,
    MyPublicationsComponent
  ],
  imports: [
    CommonModule,
    ScientistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ScientistModule { }
