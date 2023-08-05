import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

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

      const publico = document.getElementById('RBpublico') as HTMLInputElement;
      const privado = document.getElementById('RBprivado') as HTMLInputElement;
      if(publico && publico.checked){
        this.mostrarFormularioOrganismoPublico = true;
        this.mostrarFormularioOrganismoPrivado = false;
      }else if(privado && privado.checked){
        this.mostrarFormularioOrganismoPrivado = true;
        this.mostrarFormularioOrganismoPublico = false;
      }
    }
  }

  passwordVisibility(id:string, buttonid:string): void {
    const passwordInput = document.getElementById(id) as HTMLInputElement;
    const showPasswordButton = document.getElementById(buttonid) as HTMLButtonElement;
  
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPasswordButton.getElementsByTagName('img')[0].setAttribute('src', 'assets/images/hidden_eye_icon.png');
    } else {
      passwordInput.type = 'password';
      showPasswordButton.getElementsByTagName('img')[0].setAttribute('src', 'assets/images/show_eye_icon.png');
    }
  }

  async enviarFormularioCientifico(){
    var ok = true;
    //Obtener datos del formulario
    const nombreElement = document.getElementById("nombreCientifico")as HTMLInputElement;
    const nombre = nombreElement.value;
    const emailElement = document.getElementById("emailCientifico")as HTMLInputElement;
    const orcidElement = document.getElementById("orcidCientifico")as HTMLInputElement;
    const profesionElement = document.getElementById("profesionCientifico")as HTMLInputElement;
    const profesion = profesionElement.value;
    const passwordElement = document.getElementById("passwordCientifico") as HTMLInputElement;

    const form = document.getElementById('formularioCientifico') as HTMLFormElement;

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
    if(profesionElement instanceof HTMLInputElement && profesionElement.value === ''){
      alert('El campo "Profesión" no puede ser vacío.');
      return false;
    }

    if(passwordElement instanceof HTMLInputElement && passwordElement.value === ''){
      alert('El campo "Contraseña" no puede ser vacío.');
      return false;
    }

    //Comprobar longitud de la contraseña
    if (passwordElement instanceof HTMLInputElement && passwordElement.value.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    // Campos rellenos, pero con formato incorrecto.
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = emailElement.value;
    if(emailElement instanceof HTMLInputElement){
      if(!expresionEmail.test(email)){
        alert('El campo "Email" no tiene un formato válido.');
        return false;
      }
    }

    const expresionORCID = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;
    const orcid = orcidElement.value;
    if(orcidElement instanceof HTMLInputElement){
      if(!expresionORCID.test(orcid)){
        alert('El campo "ORCID" no tiene un formato válido.\n El formato válido se compone de: 4 grupos de 4 dígitos separados cada uno por un guión. P.ej: 1234-5234-7532-9643 \n O bien, por 3 grupos de 4 digitos y un último grupo con 3 dígitos y la letra X separados por guiones. P.ej: 1234-5234-7532-964X');
        return false;
      }
    }

    var uid;
    try{
      //1º. Registrar usuario en Firebase
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(emailElement.value, passwordElement.value);
      uid = userCredential.user?.uid;
      console.log('Científico registrado:', userCredential.user);
      
      if(form){form.reset();}

      // 2º. UID del usuario existente, se registra usuario en la BD local
      if(uid != null){ 
        
        const formUser = {
          uuId: uid,
          uuidEmail: email,
          active: true
        }

        const jsonUser = JSON.stringify(formUser);

        console.log(jsonUser);

        await fetch('http://localhost:8080/api/project/usuario', {
          method: 'POST',
          body: jsonUser,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
          ok=false;
          console.error('Error al enviar los datos:', error);
          alert(error.message);
        });

        
        // 3º. Se inserta el cientifico en la BD local.
        const formData ={
          orcid: orcid,
          userUuid: uid,
          name: nombre,
          email: email,
          profession: profesion,
          active: true
        }

        const jsonData = JSON.stringify(formData);

        console.log(jsonData);

        await fetch('http://localhost:8080/api/project/cientifico', {
          method: 'POST',
          body: jsonData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
          
        })
        .catch(error => {
          ok=false;
          console.error('Error al enviar los datos:', error);
          alert(error.message);
        });

        if(ok){alert('¡El científico ha sido registrado correctamente! \n ');}
        
      } 

    }catch(error) {
      uid = null;
      console.error('Error al registrar científico:', error);
      alert('Error al registrar el científico. \n ');
    }

    
    return true;
  }

  async enviarFormularioOrganismoPublico(){
    var ok = true;
    //Obtener datos del formulario
    const DIR3Element = document.getElementById("codigoDIR3") as HTMLInputElement;
    const dir3 = DIR3Element.value;
    const nombreElement = document.getElementById("nombreOrganismo") as HTMLInputElement;
    const nombre = nombreElement.value;
    const emailElement = document.getElementById("emailOrganismo") as HTMLInputElement;
    const localidadElement = document.getElementById("localidadOrganismo") as HTMLInputElement;
    const localidad = localidadElement.value;
    const areaPublicElement = document.getElementById("RBpublico") as HTMLInputElement;
    const area = areaPublicElement.value;
    const passwordElement = document.getElementById("passwordOrganismo") as HTMLInputElement;

    const form = document.getElementById('formularioOrganismoPublico') as HTMLFormElement;

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
      alert('El campo "Localidad" no puede ser vacío.');
      return false;
    }

    if(passwordElement instanceof HTMLInputElement && passwordElement.value === ''){
      alert('El campo "Contraseña" no puede ser vacío.');
      return false;
    }

    //Comprobar longitud de la contraseña
    if (passwordElement instanceof HTMLInputElement && passwordElement.value.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    // Campos rellenos, pero con formato incorrecto.
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = emailElement.value;
    if(emailElement instanceof HTMLInputElement){
      if(!expresionEmail.test(email)){
        alert('El campo "Email" no tiene un formato válido.');
        return false;
      }
    }

    const expresionDIR3 = /^[A-Z]{1,2}\d{7,8}$/;
    if(DIR3Element instanceof HTMLInputElement){
      const dir3 = DIR3Element.value;
      if(!expresionDIR3.test(dir3)){
        alert('El campo "Código DIR3" no tiene un formato válido.\n El código DIR3 debe comenzar con una o dos letras mayúsculas seguidas de 7 u 8 dígitos.\n P.ej: A12345678 o AB1234567');
        return false;
      }
    }

    try{
      //1º. Registrar usuario en Firebase
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(emailElement.value, passwordElement.value);
      var uid = userCredential.user?.uid;
      console.log('Organismo público registrado:', userCredential.user);
      
      if(form){form.reset();}

      if(area == "publico"){
      
        // 2º. UID del usuario existente, se registra usuario en la BD local
        if(uid != null){ 
  
          const formUser = {
            uuId: uid,
            uuidEmail: email,
            active: true
          }
  
          const jsonUser = JSON.stringify(formUser);
  
          console.log(jsonUser);
  
          await fetch('http://localhost:8080/api/project/usuario', {
            method: 'POST',
            body: jsonUser,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log('Respuesta del servidor:', data);
          })
          .catch(error => {
            ok=false;
            console.error('Error al enviar los datos:', error);
            alert(error.message);
          });
  
          // 3º. Se inserta el organismo público en la BD local.
          const formDataPublic ={
            idOrganization: dir3,
            userUuid: uid,
            name: nombre,
            email: email,
            location: localidad,
            area: "Público",
            active: true
          }
  
          const jsonData = JSON.stringify(formDataPublic);
          console.log(jsonData);
          
          await fetch('http://localhost:8080/api/project/organismo', {
            method: 'POST',
            body: jsonData,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log('Respuesta del servidor:', data);
          })
          .catch(error => {
            ok = false;
            console.error('Error al enviar los datos:', error);
            alert(error.message);
          });

          if(ok){alert('¡El organismo público ha sido registrado correctamente! \n ');}  
        }
      }

    }catch(error) {
      console.error('Error al registrar organismo público:', error);
      alert('Error al registrar el organismo público.\n ');
    }
    
    return true;
  }

  async enviarFormularioOrganismoPrivado(){
    var ok = true;
    //Obtener datos del formulario
    const NIFElement = document.getElementById("NIF") as HTMLInputElement;
    const NIF = NIFElement.value;
    const nombreElement = document.getElementById("nombreOrganismo") as HTMLInputElement;
    const nombre = nombreElement.value;
    const emailElement = document.getElementById("emailOrganismo") as HTMLInputElement;
    const localidadElement = document.getElementById("localidadOrganismo") as HTMLInputElement;
    const localidad = localidadElement.value;
    const areaPrivateElement = document.getElementById("RBprivado") as HTMLInputElement;
    const area = areaPrivateElement.value;
    const passwordElement = document.getElementById("passwordOrganismo") as HTMLInputElement;

    const form = document.getElementById('formularioOrganismoPrivado') as HTMLFormElement;

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
      alert('El campo "Localidad" no puede ser vacío.');
      return false;
    }

    if(passwordElement instanceof HTMLInputElement && passwordElement.value === ''){
      alert('El campo "Contraseña" no puede ser vacío.');
      return false;
    }

    //Comprobar longitud de la contraseña
    if (passwordElement instanceof HTMLInputElement && passwordElement.value.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    // Campos rellenos, pero con formato incorrecto.
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = emailElement.value;
    if(emailElement instanceof HTMLInputElement){
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

    try{
      //1º. Registrar usuario en Firebase
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(emailElement.value, passwordElement.value);
      var uid = userCredential.user?.uid;
      console.log('Organismo privado registrado:', userCredential.user);

      if(form){form.reset();}

      if(area == "privado"){
        // 2º. UID del usuario existente, se registra usuario en la BD local
        if(uid != null){ 
  
          const formUser = {
            uuId: uid,
            uuidEmail: email,
            active: true
          }
  
          const jsonUser = JSON.stringify(formUser);
  
          console.log(jsonUser);
  
          await fetch('http://localhost:8080/api/project/usuario', {
            method: 'POST',
            body: jsonUser,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log('Respuesta del servidor:', data);
          })
          .catch(error => {
            ok=false;
            console.error('Error al enviar los datos:', error);
            alert(error.message);
          });
  
          // 3º. Se inserta el organismo privado en la BD local.
          const formDataPrivate ={
            idOrganization: NIF,
            userUuid: uid,
            name: nombre,
            email: email,
            location: localidad,
            area: "Privado",
            active: true
          }
  
          const jsonData = JSON.stringify(formDataPrivate);
          console.log(jsonData);
  
          await fetch('http://localhost:8080/api/project/organismo', {
            method: 'POST',
            body: jsonData,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log('Respuesta del servidor:', data);
          })
          .catch(error => {
            ok = false;
            console.error('Error al enviar los datos:', error);
            alert(error.message);
          });
          
          if(ok){alert('¡El organismo privado ha sido registrado correctamente! \n ');}
        }
      }


    }catch(error){
      console.error('Error al registrar organismo privado:', error);
      alert('Error al registrar el organismo privado.\n ');
    }

    
    return true;
  }

  ngOnInit() {}

}
