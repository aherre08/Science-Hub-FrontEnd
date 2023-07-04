import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientistRoutingModule } from './scientist-routing.module';
import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreatePublicationComponent
  ],
  imports: [
    CommonModule,
    ScientistRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ScientistModule { }
