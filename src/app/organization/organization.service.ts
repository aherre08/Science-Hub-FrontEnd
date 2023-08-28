import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from './my-projects/my-projects.model';
import { Cientifico } from './search-scientist/search-scientist.model';



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
    return this.http.get<Proyecto>(this.apiUrl+ '/proyecto/'+ idProyecto);
  }

  editarProyecto(idProyecto: number, proyecto: Proyecto): Observable<Proyecto> {
    const url = `${this.apiUrl}/proyecto/${idProyecto}`;
    return this.http.put<Proyecto>(url, proyecto);
  }

  eliminarProyecto(idProyecto:number):Observable<Proyecto>{
    return this.http.delete<Proyecto>(this.apiUrl+ '/proyecto/'+ idProyecto);
  }

  obtenerCientifico(orcid:string):Observable<Cientifico>{
    return this.http.get<Cientifico>(this.apiUrl+ '/cientifico/findBy/'+ orcid);
  }  

  recomendarCientificos(idProject:number){
    return this.http.get<any>(this.apiUrl + '/proyecto/recommendation/'+ idProject);
  }
 
}
