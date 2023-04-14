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
  mostrarRadioButtonsOrganismo = false;
  mostrarFormularioOrganismoPublico = false;
  mostrarFormularioOrganismoPrivado = false;
  
  mostrarFormulario() {
    const cientifico = document.getElementById('cientifico') as HTMLInputElement;
    if (cientifico && cientifico.checked) {
      this.mostrarFormularioCientifico = true;
      this.mostrarRadioButtonsOrganismo = false;
      this.mostrarFormularioOrganismoPublico = false;
      this.mostrarFormularioOrganismoPrivado = false;
    } else {
      this.mostrarFormularioCientifico = false;
      this.mostrarRadioButtonsOrganismo = true;
      this.mostrarFormularioOrganismoPublico = false;
      this.mostrarFormularioOrganismoPrivado = false;

      const publico = document.getElementById('publico') as HTMLInputElement;
      const privado = document.getElementById('privado') as HTMLInputElement;
      if(publico && publico.checked){
        this.mostrarFormularioOrganismoPublico = true;
        this.mostrarFormularioOrganismoPrivado = false;
      }else if(privado && privado.checked){
        this.mostrarFormularioOrganismoPrivado = true;
        this.mostrarFormularioOrganismoPublico = false;
      }
    }
  }

  enviarFormularioCientifico(){
    //Obtener datos del formulario
    const nombreElement = document.getElementById("nombreCientifico");
    const emailElement = document.getElementById("emailCientifico");
    const orcidElement = document.getElementById("orcidCientifico");
    const especialidadElement = document.getElementById("especialidadCientifico");

    //Validar los datos del formulario
    // Campos del formulario vacíos
    if (nombreElement instanceof HTMLInputElement && nombreElement.value === '') {
      alert('El campo "Nombre" no puede ser vacío.');
      return false;
    }
    if (emailElement instanceof HTMLInputElement && emailElement.value === '') {
      alert('El campo "Email" no puede ser vacío.');
      return false;
    }
    if(orcidElement instanceof HTMLInputElement && orcidElement.value === ''){
      alert('El campo "ORCID" no puede ser vacío.');
      return false;
    }
    if(especialidadElement instanceof HTMLInputElement && especialidadElement.value === ''){
      alert('El campo "Especialidad" no puede ser vacío.');
      return false;
    }

    // Campos rellenos, pero con formato incorrecto.
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailElement instanceof HTMLInputElement){
      const email = emailElement.value;
      if(!expresionEmail.test(email)){
        alert('El campo "Email" no tiene un formato válido.');
        return false;
      }
    }

    const expresionORCID = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;
    if(orcidElement instanceof HTMLInputElement){
      const orcid = orcidElement.value;
      if(!expresionORCID.test(orcid)){
        alert('El campo "ORCID" no tiene un formato válido.\n El formato válido se compone de: 4 grupos de 4 dígitos separados cada uno por un guión. P.ej: 1234-5234-7532-9643 \n O bien, por 3 grupos de 4 digitos y un último grupo con 3 dígitos y la letra X separados por guiones. P.ej: 1234-5234-7532-964X');
        return false;
      }
    }

    const form = document.getElementById('formularioCientifico') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (event) =>{
        event.preventDefault();
        const formData = new FormData(form);
        
        fetch('http://localhost:8080/cientifico', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });

      });
    }

    return true;
  }

  enviarFormularioOrganismoPublico(){
    //Obtener datos del formulario
    const DIR3Element = document.getElementById("codigoDIR3");
    const nombreElement = document.getElementById("nombreOrganismo");
    const emailElement = document.getElementById("emailOrganismo");
    const localidadElement = document.getElementById("localidadOrganismo");

    //Validar los datos del formulario
    // Campos del formulario vacíos
    if(DIR3Element instanceof HTMLInputElement && DIR3Element.value === ''){
      alert('El campo "Código DIR3" no puede ser vacío.');
      return false;
    }
    
    if (nombreElement instanceof HTMLInputElement && nombreElement.value === '') {
      alert('El campo "Nombre" no puede ser vacío.');
      return false;
    }
    if (emailElement instanceof HTMLInputElement && emailElement.value === '') {
      alert('El campo "Email" no puede ser vacío.');
      return false;
    }
    
    if(localidadElement instanceof HTMLInputElement && localidadElement.value === ''){
      alert('El campo "Especialidad" no puede ser vacío.');
      return false;
    }

    // Campos rellenos, pero con formato incorrecto.
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailElement instanceof HTMLInputElement){
      const email = emailElement.value;
      if(!expresionEmail.test(email)){
        alert('El campo "Email" no tiene un formato válido.');
        return false;
      }
    }

    const expresionDIR3 = /^[A-Z]{1,2}\d{7,8}$/;
    if(DIR3Element instanceof HTMLInputElement){
      const dir3 = DIR3Element.value;
      if(!expresionDIR3.test(dir3)){
        alert('El campo "Código DIR3" no tiene un formato válido.\n El código DIR3 que debe comenzar con una o dos letras mayúsculas seguidas de 7 u 8 dígitos.\n P.ej: A12345678 o AB1234567');
        return false;
      }
    }


    const form = document.getElementById('formularioOrganismoPublico') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (event) =>{
        event.preventDefault();
        const formData = new FormData(form);
        
        fetch('http://localhost:8080/organismo', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });

      });
    }

    return true;
  }

  enviarFormularioOrganismoPrivado(){
    //Obtener datos del formulario
    const NIFElement = document.getElementById("NIF");
    const nombreElement = document.getElementById("nombreOrganismo");
    const emailElement = document.getElementById("emailOrganismo");
    const localidadElement = document.getElementById("localidadOrganismo");


    //Validar los datos del formulario
    // Campos del formulario vacíos
    if(NIFElement instanceof HTMLInputElement && NIFElement.value === ''){
      alert('El campo "NIF" no puede ser vacío.');
      return false;
    }
    
    if (nombreElement instanceof HTMLInputElement && nombreElement.value === '') {
      alert('El campo "Nombre" no puede ser vacío.');
      return false;
    }
    if (emailElement instanceof HTMLInputElement && emailElement.value === '') {
      alert('El campo "Email" no puede ser vacío.');
      return false;
    }
    
    if(localidadElement instanceof HTMLInputElement && localidadElement.value === ''){
      alert('El campo "Especialidad" no puede ser vacío.');
      return false;
    }

    // Campos rellenos, pero con formato incorrecto.
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailElement instanceof HTMLInputElement){
      const email = emailElement.value;
      if(!expresionEmail.test(email)){
        alert('El campo "Email" no tiene un formato válido.');
        return false;
      }
    }

    const expresionNIF = /^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$/;
    if(NIFElement instanceof HTMLInputElement){
      const NIF = NIFElement.value;
      if(!expresionNIF.test(NIF)){
        alert('El campo "NIF" no tiene un formato válido.\n Se aceptan el siguiente formato: Letra mayúscula + 7 dígitos + Letra mayúscula. P.ej: A1234567B\n ');
        return false;
      }
    }

    const form = document.getElementById('formularioOrganismoPrivado') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (event) =>{
        event.preventDefault();
        const formData = new FormData(form);
        
        fetch('http://localhost:8080/organismo', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });

      });
    }


    return true;
  }

  constructor() {
  }

  ngOnInit() {}

  onSubmit():void {}

}
