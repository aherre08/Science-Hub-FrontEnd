import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacion } from './my-publications/my-publications.model';

@Injectable({
  providedIn: 'root'
})
export class ScientistService {

  private apiUrl = 'http://localhost:8080/api/project';

  constructor(private http: HttpClient) { }

  realizarPublicacion(publicacion: any): Observable<any>{
    return this.http.post(this.apiUrl + '/publicacion', publicacion);
  }

  obtenerPublicaciones(orcid:string): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl + '/publicacion/all/'+ orcid);
  }

  obtenerPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.get<Publicacion>(this.apiUrl+ '/publicacion/'+idPublicacion);
  }

  eliminarPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.delete<Publicacion>(this.apiUrl+ '/publicacion/'+idPublicacion);
  }

  editarPublicacion(idPublicacion: number, publicacion: Publicacion): Observable<Publicacion> {
    const url = `${this.apiUrl}/publicacion/${idPublicacion}`;
    return this.http.put<Publicacion>(url, publicacion);
  }
}
