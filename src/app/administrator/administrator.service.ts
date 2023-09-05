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

  private apiUrl = 'http://localhost:8080/api/searchProject';

  constructor(private http: HttpClient) { }

  //Publicaciones
  obtenerPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.get<Publicacion>(this.apiUrl+ '/publication/'+idPublicacion);
  }
  
  obtenerTodasPublicaciones(){
    return this.http.get<Publicacion[]>(`${this.apiUrl}/publication/all`);
  }

  editarPublicacion(idPublicacion: number, publicacion: Publicacion): Observable<Publicacion> {
    const url = `${this.apiUrl}/publication/${idPublicacion}`;
    return this.http.put<Publicacion>(url, publicacion);
  }

  eliminarPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.delete<Publicacion>(this.apiUrl+ '/publication/'+idPublicacion);
  }

  reactivarPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.get<Publicacion>(this.apiUrl+ '/publication/reactivate/'+ idPublicacion);
  }

  // Usuarios

  obtenerOrganismo(id:number):Observable<Organismo>{
    return this.http.get<Organismo>(this.apiUrl + '/organization/' + id);
  }
  
  obtenerTodosOrganismos():Observable<Organismo[]>{
    return this.http.get<Organismo[]>(this.apiUrl+ '/organization/all');
  }

  editarOrganismo(idOrganismo: number, organismo: Organismo):Observable<Organismo>{
    const url = `${this.apiUrl}/organization/${idOrganismo}`;
    return this.http.put<Organismo>(url, organismo);
  }

  eliminarOrganismo(idOrganismo: number):Observable<Organismo>{
    return this.http.delete<Organismo>(this.apiUrl + '/organization/'+ idOrganismo);
  }

  reactivarOrganismo(idProyecto: string):Observable<Organismo>{
    return this.http.get<Organismo>(this.apiUrl+ '/organization/reactivate/'+ idProyecto);
  }


  obtenerCientifico(id:number):Observable<Cientifico>{
    return this.http.get<Cientifico>(this.apiUrl + '/scientist/' + id);
  }

  obtenerTodosCientificos():Observable<Cientifico[]>{
    return this.http.get<Cientifico[]>(this.apiUrl+ '/scientist/all');
  }

  editarCientifico(idCientifico: number, cientifico: Cientifico):Observable<Cientifico>{
    const url = `${this.apiUrl}/scientist/${idCientifico}`;
    return this.http.put<Cientifico>(url, cientifico);
  }

  eliminarCientifico(orcid: string):Observable<Cientifico>{
    return this.http.delete<Cientifico>(this.apiUrl + '/scientist/'+ orcid);
  }

  reactivarCientifico(orcid: string):Observable<Cientifico>{
    return this.http.get<Cientifico>(this.apiUrl+ '/scientist/reactivate/'+ orcid);
  }

  
  //Proyectos

  obtenerProyecto(idProyecto:number):Observable<Proyecto>{
    return this.http.get<Proyecto>(this.apiUrl+ '/project/'+ idProyecto);
  }

  obtenerTodosProyectos():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.apiUrl + '/project/all/');
  }

  editarProyecto(idProyecto: number, proyecto: Proyecto): Observable<Proyecto> {
    const url = `${this.apiUrl}/project/${idProyecto}`;
    return this.http.put<Proyecto>(url, proyecto);
  }

  eliminarProyecto(idProyecto:number):Observable<Proyecto>{
    return this.http.delete<Proyecto>(this.apiUrl+ '/project/'+ idProyecto);
  }

  reactivarProyecto(idProyecto:number):Observable<Proyecto>{
    return this.http.get<Proyecto>(this.apiUrl+ '/project/reactivate/'+ idProyecto);
  }

}
