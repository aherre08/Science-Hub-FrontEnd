import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  mostrarFormularioCientifico = false;

  mostrarFormulario() {
    const cientifico = document.getElementById('cientifico') as HTMLInputElement;
    if (cientifico && cientifico.checked) {
      this.mostrarFormularioCientifico = true;
    } else {
      this.mostrarFormularioCientifico = false;
    }
  }

  constructor() {
  }

  ngOnInit() {}

  onSubmit():void {}

}
