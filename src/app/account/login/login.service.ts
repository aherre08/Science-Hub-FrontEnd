import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
    providedIn: 'root'
})

export class LoginService{
    
    private apiUrl = 'http://localhost:8080'; // Ruta base de la API

    constructor(private router: Router, private http: HttpClient, private afAuth: AngularFireAuth) { }

    login(email: string, password: string): Observable<string> {
      return this.authentication(email, password).pipe(
        switchMap(() => {
          return this.getUserType(email);
        })
      );
    }
    
    private authentication(email: string, password: string): Observable<void> {
      return new Observable((observer) => {
        this.afAuth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Inicio de sesión con éxito.
            console.log('Usuario autenticado:', userCredential.user);
            observer.next();
            observer.complete();
          })
          .catch((error) => {
            // Ocurrió un error durante el inicio de sesión
            console.error('Error al autenticar usuario:', error);
            observer.error(error);
          });
      });
    }
    
    //Llamada a back-end para obtener el tipo de usuario
    getUserType(email: string): Observable<string> {
      const url = `${this.apiUrl}/getUserType?email=${email}`;
      return this.http.get<string>(url);
    }
}