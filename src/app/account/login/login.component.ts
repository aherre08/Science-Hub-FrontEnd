import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoginResponse } from './loginResponse';
import { response } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

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
      (response: LoginResponse) => {
        console.log("Respuesta recibida: ", response);
        const userType = response.userType;
        const idUser = response.idUser;
        
        if (userType === 'cientifico') {
          this.router.navigate(['/scientist/create-publication']);
        } else if (userType === 'organizacion') {
          this.router.navigate(['/dashboard-organizacion']);
        } else {
          console.error('Tipo de usuario no válido:', response);
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
