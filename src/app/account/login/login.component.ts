import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoginResponse } from './loginResponse';
import { response } from 'express';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private userService: UserService) { }

  ngOnInit() {
      this.loginForm = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
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

  iniciarSesion(){
    const emailElement = document.getElementById("emailLogin") as HTMLInputElement;
    const passwordElement = document.getElementById("passwordLogin") as HTMLInputElement;

    if (emailElement instanceof HTMLInputElement && emailElement.value === '') {
      alert('El campo "Email" no puede ser vacío.');
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

    if(passwordElement instanceof HTMLInputElement && passwordElement.value === ''){
      alert('El campo "Contraseña" no puede ser vacío.');
      return false;
    }
    
    if (passwordElement instanceof HTMLInputElement && passwordElement.value.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loginService.login(email, password).subscribe(
      async (response: LoginResponse) => {
        console.log("Respuesta recibida: ", response);
        const userType = response.userType;
        const idUser = response.idUser;
        
        if (userType === 'cientifico') {
          
          this.userService.setUserId(idUser);
        
          try {
            const response = await fetch('http://localhost:8080/api/project/cientifico/' + idUser, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            if (response.ok) {

              const data = await response.json();
              console.log('Respuesta del servidor:', data);
              this.userService.setOrcid(data.orcid);
              this.userService.setUserUuid(data.userUuid);
              this.userService.setName(data.name);
              this.userService.setEmail(data.email);
              this.userService.setProfession(data.profession);
        
              this.router.navigate(['/scientist/create-publication']);

            } else {
              console.error('Error al obtener los datos:', response.status);
              alert('Error al obtener los datos del usuario.');
            }
          } catch (error) {
            console.error('Error al enviar los datos:', error);
          }
        } else if (userType === 'organismo') {

          this.userService.setUserId(idUser);

          try {
            const response = await fetch('http://localhost:8080/api/project/organismo/' + idUser, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            if (response.ok) {
              
              const data = await response.json();
              console.log('Respuesta del servidor:', data);
              this.userService.setOrgId(data.idOrganization);
              this.userService.setUserUuid(data.userUuid);
              this.userService.setName(data.name);
              this.userService.setEmail(data.email);
              this.userService.setLocation(data.location);
              this.userService.setArea(data.area);
        
              this.router.navigate(['/organization/publish-project']);

            } else {
              console.error('Error al obtener los datos:', response.status);
              alert('Error al obtener los datos del usuario.');
            }
          } catch (error) {
            console.error('Error al enviar los datos:', error);
          }

        } else {
          console.error('Tipo de usuario no válido:', response);
          this.userService.setUserId(undefined);
          alert('Las credenciales introducidas no corresponden a un usuario existente.');
          
        }
      },
      (error: any) => {
        console.error('Error al iniciar sesión:', error);
        alert('Se ha producido un error al iniciar sesión.');
      }
    );

    return true;
  }
  
}
