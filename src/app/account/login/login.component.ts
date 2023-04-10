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
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit():void {
      this.submitted = true;
  }
}
