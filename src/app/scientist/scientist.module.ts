import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientistRoutingModule } from './scientist-routing.module';
import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPublicationsComponent } from './my-publications/my-publications.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPublicationComponent } from './search-publication/search-publication.component';
import { NgxPaginationModule } from 'ngx-pagination'; 


@NgModule({
  declarations: [
    CreatePublicationComponent,
    MyPublicationsComponent,
    SearchPublicationComponent
  ],
  imports: [
    CommonModule,
    ScientistRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
})
export class ScientistModule { }
