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
}
