import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private fb: FormBuilder,
      private loginService: LoginService,
      private router: Router,
    
  ) { }

  ngOnInit() {
      this.loginForm = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

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

  onSubmit():void {
      this.submitted = true;

      if(this.loginForm.invalid){ return; }

      const {email, password} = this.loginForm.value;
      this.loading = true;
      this.loginService.login(email, password).subscribe(
        () => {
          this.loginService.getUserType(email).subscribe(
            (userType: string) => {
              if (userType === 'cientifico') {
                this.router.navigate(['/dashboard-cientifico']);
              } else if (userType === 'organizacion') {
                this.router.navigate(['/dashboard-organizacion']);
              } 
            },
            (error: any) => {
              console.error(error);
              // Manejar errores al obtener el tipo de usuario
            }
          );
        },
        (error: any) => {
          console.error(error);
          // Manejar errores de inicio de sesión, por ejemplo, mostrar un mensaje de error en el formulario.
        }
      );
  }
}
