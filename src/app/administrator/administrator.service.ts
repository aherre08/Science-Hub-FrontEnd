import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organismo, Proyecto } from '../scientist/search-organization/search-organization.model';
import { Publicacion } from '../scientist/my-publications/my-publications.model';
import { Cientifico } from '../organization/search-scientist/search-scientist.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/project';

  constructor(private http: HttpClient) { }

  //Publicaciones
  obtenerPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.get<Publicacion>(this.apiUrl+ '/publicacion/'+idPublicacion);
  }
  
  obtenerTodasPublicaciones(){
    return this.http.get<Publicacion[]>(`${this.apiUrl}/publicacion/all`);
  }

  editarPublicacion(idPublicacion: number, publicacion: Publicacion): Observable<Publicacion> {
    const url = `${this.apiUrl}/publicacion/${idPublicacion}`;
    return this.http.put<Publicacion>(url, publicacion);
  }

  eliminarPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.delete<Publicacion>(this.apiUrl+ '/publicacion/'+idPublicacion);
  }

  reactivarPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.get<Publicacion>(this.apiUrl+ '/publicacion/reactivate/'+ idPublicacion);
  }

  // Usuarios

  obtenerOrganismo(id:number):Observable<Organismo>{
    return this.http.get<Organismo>(this.apiUrl + '/organismo/' + id);
  }
  
  obtenerTodosOrganismos():Observable<Organismo[]>{
    return this.http.get<Organismo[]>(this.apiUrl+ '/organismo/all');
  }

  editarOrganismo(idOrganismo: number, organismo: Organismo):Observable<Organismo>{
    const url = `${this.apiUrl}/organismo/${idOrganismo}`;
    return this.http.put<Organismo>(url, organismo);
  }

  eliminarOrganismo(idOrganismo: number):Observable<Organismo>{
    return this.http.delete<Organismo>(this.apiUrl + '/organismo/'+ idOrganismo);
  }

  reactivarOrganismo(idProyecto: string):Observable<Organismo>{
    return this.http.get<Organismo>(this.apiUrl+ '/organismo/reactivate/'+ idProyecto);
  }


  obtenerCientifico(id:number):Observable<Cientifico>{
    return this.http.get<Cientifico>(this.apiUrl + '/cientifico/' + id);
  }

  obtenerTodosCientificos():Observable<Cientifico[]>{
    return this.http.get<Cientifico[]>(this.apiUrl+ '/cientifico/all');
  }

  editarCientifico(idCientifico: number, cientifico: Cientifico):Observable<Cientifico>{
    const url = `${this.apiUrl}/cientifico/${idCientifico}`;
    return this.http.put<Cientifico>(url, cientifico);
  }

  eliminarCientifico(orcid: string):Observable<Cientifico>{
    return this.http.delete<Cientifico>(this.apiUrl + '/cientifico/'+ orcid);
  }

  reactivarCientifico(orcid: string):Observable<Cientifico>{
    return this.http.get<Cientifico>(this.apiUrl+ '/cientifico/reactivate/'+ orcid);
  }

  
  //Proyectos

  obtenerProyecto(idProyecto:number):Observable<Proyecto>{
    return this.http.get<Proyecto>(this.apiUrl+ '/proyecto/'+ idProyecto);
  }

  obtenerTodosProyectos():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.apiUrl + '/proyecto/all/');
  }

  editarProyecto(idProyecto: number, proyecto: Proyecto): Observable<Proyecto> {
    const url = `${this.apiUrl}/proyecto/${idProyecto}`;
    return this.http.put<Proyecto>(url, proyecto);
  }

  eliminarProyecto(idProyecto:number):Observable<Proyecto>{
    return this.http.delete<Proyecto>(this.apiUrl+ '/proyecto/'+ idProyecto);
  }

  reactivarProyecto(idProyecto:number):Observable<Proyecto>{
    return this.http.get<Proyecto>(this.apiUrl+ '/proyecto/reactivate/'+ idProyecto);
  }

}
