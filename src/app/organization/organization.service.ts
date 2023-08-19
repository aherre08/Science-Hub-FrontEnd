import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from './my-projects/my-projects.model';



@Injectable({
  providedIn: 'root'
})
export class OrganizationService { 

  private apiUrl = 'http://localhost:8080/api/project';

  constructor(private http: HttpClient) { }

  publicarProyecto(proyecto: any): Observable<any>{
    return this.http.post(this.apiUrl + '/proyecto', proyecto);
  }

  obtenerProyectos(orgId: string): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl + '/proyecto/all/'+ orgId);
  }

  obtenerProyecto(idProyecto:number):Observable<Proyecto>{
    return this.http.get<Proyecto>(this.apiUrl+ '/proyecto/'+idProyecto);
  }

  eliminarProyecto(idPublicacion: number) {
    throw new Error('Method not implemented.');
  }
 
}
