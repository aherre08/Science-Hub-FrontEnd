import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class LoginService{
    
    private apiUrl = 'http://localhost:8080'; // Ruta base de la API

    constructor(private router: Router, private http: HttpClient) { }

    // Verificar si el usuario es Cientifico o Organismo
    login(email: string, password: string): Observable<any> {
        return this.getUserType(email).pipe(
          map((userType) => {
            if (userType === 'cientifico') {
              this.loginCientifico(email, password);
            } else if (userType === 'organismo') {
              this.loginOrganismo(email, password);
            } else {
              // Manejar un tipo de usuario desconocido
              throw new Error('Tipo de usuario desconocido');
            }
          })
        );
      }
    
      getUserType(email: string): Observable<string> {
        const url = `${this.apiUrl}/getUserType?email=${email}`;
        return this.http.get<string>(url);
      }
    
      // Realizar la lógica de verificación para Cientifico
      private loginCientifico(email: string, password: string): void {
        
        const url = `${this.apiUrl}/cientifico`;
    
        /* 
            Realizar la solicitud HTTP para verificar las credenciales del Cientifico 
            utilizando email y password en el cuerpo de la solicitud
        */ 
        this.http.post(url, { email, password }).subscribe(
          (response) => {
            // Credenciales correctas, redirigir a la página del Cientifico
            this.router.navigate(['/dashboard-cientifico']);
          },
          (error) => {
            // Credenciales incorrectas o error en la solicitud, manejar el error
          }
        );
      }
    
      // Realizar la lógica de verificación para Organismo
      private loginOrganismo(email: string, password: string): void {
        
        const url = `${this.apiUrl}/organismo`;
    
        /* 
            Realizar la solicitud HTTP para verificar las credenciales del Organismo
            utilizando email y password en el cuerpo de la solicitud
        */ 
        this.http.post(url, { email, password }).subscribe(
          (response) => {
            // Credenciales correctas, redirigir a la página del Organismo
            this.router.navigate(['/dashboard-organismo']);
          },
          (error) => {
            // Credenciales incorrectas o error en la solicitud, manejar el error
          }
        );
    }
}