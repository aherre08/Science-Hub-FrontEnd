import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core";
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
    providedIn: 'root'
})

export class LoginService{

  private apiUrl = 'http://localhost:8080/api/project'; // Ruta base de la API
 

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap(userCredential => {
        const { uid } = userCredential.user!;
        console.log("UID: " + uid);
        if (uid) {
          /*http://localhost:8080/api/project/login/f9BjtXqmIZX1W7xKybw8POES6uw2*/
          const url = `${this.apiUrl}/login/${uid}`;
          console.log("URL --------> " + url);
          console.log(this.http.get(url));
          return this.http.get(url).pipe(
            catchError(error => {
              console.error('Error en la petición GET:', error);
              return throwError('Error en la petición GET');
            })
          );
        } else {
          return throwError('No se pudo obtener el UID de usuario.');
        }
      }),
      catchError(error => {
        console.error('Error al autenticar usuario:', error);
        return throwError(error);
      })
    );
  } 

  
}