import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Cientifico } from '../organization/search-scientist/search-scientist.model';
import { Organismo, Proyecto } from '../scientist/search-organization/search-organization.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8080/api/project';

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) { }

  obtenerProyectoAsociadoACientifico(orcid:string):Observable<Proyecto>{
    return this.http.get<Proyecto>(this.apiUrl+ '/cientifico/project/'+ orcid);
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential) => {
        // Verificar si el userCredential.user es null o no
        if (userCredential.user) {
          const uid = userCredential.user.uid;
          console.log("UID" + uid);
          const url = `${this.apiUrl}/login/${uid}`;
          console.log("URL" + url);
          return this.http.get(url).pipe(
            catchError((error: any) => {
              console.error('Error en la petición GET:', error);
              return throwError('Error en la petición GET');
            })
          );
        } else {
          return throwError('No se pudo obtener el UID de usuario.');
        }
      }),
      catchError((error: any) => {
        console.error('Error al autenticar usuario:', error);
        return throwError(error);
      })
    );
  } 

  editarPerfilCientifico(idCientifico:number, cientifico:Cientifico){
    const url = `${this.apiUrl}/cientifico/${idCientifico}`;
    return this.http.put<Cientifico>(url, cientifico);
  }

  editarPerfilOrganismo(idOrganismo:number, organismo:Organismo){
    const url = `${this.apiUrl}/organismo/${idOrganismo}`;
    return this.http.put<Cientifico>(url, organismo);
  }
}
