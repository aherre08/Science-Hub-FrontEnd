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

  obtenerPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl + '/publicacion/all');
  }
}
