import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicacion } from './my-publications/my-publications.model';
import { Organismo, Proyecto } from './search-organization/search-organization.model';
import { Cientifico } from '../organization/search-scientist/search-scientist.model';

@Injectable({
  providedIn: 'root'
})
export class ScientistService {

  private apiUrl = 'http://localhost:8080/api/searchProject';

  constructor(private http: HttpClient) { }

  realizarPublicacion(publicacion: any): Observable<any>{
    return this.http.post(this.apiUrl + '/publication', publicacion);
  }

  obtenerPublicaciones(orcid:string): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl + '/publication/all/'+ orcid);
  }

  obtenerPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.get<Publicacion>(this.apiUrl+ '/publication/'+idPublicacion);
  }

  eliminarPublicacion(idPublicacion:number):Observable<Publicacion>{
    return this.http.delete<Publicacion>(this.apiUrl+ '/publication/'+idPublicacion);
  }

  editarPublicacion(idPublicacion: number, publicacion: Publicacion): Observable<Publicacion> {
    const url = `${this.apiUrl}/publication/${idPublicacion}`;
    return this.http.put<Publicacion>(url, publicacion);
  }

  buscarOrganismo(nombreOrg: string): Observable<Organismo[]>{
    return this.http.get<Organismo[]>(this.apiUrl + '/organization/findByName/' + nombreOrg);
  }

  obtenerProyectoAsociadoACientifico(orcid:string):Observable<Proyecto>{
    return this.http.get<Proyecto>(this.apiUrl+ '/scientist/project/'+ orcid);
  }

  obtenerProyecto(idProyecto:number):Observable<Proyecto>{
    return this.http.get<Proyecto>(this.apiUrl+ '/project/'+ idProyecto);
  }

  obtenerProyectos(orgId:string){
    return this.http.get<Proyecto[]>(this.apiUrl + '/project/all/' + orgId);
  }

  apuntarEnProyecto(orcid:string, idProject:number){
    const url = `${this.apiUrl}/scientist/assignment/${orcid}?idProject=${idProject}`;
    return this.http.get<boolean>(url);
  }

  dejarDeParticiparEnProyecto(orcid:string, idProject:number){
    const url = `${this.apiUrl}/scientist/assignment/getOut/${orcid}?idProject=${idProject}`;
    return this.http.get<boolean>(url);
  }


  recomendarProyectos(orcid:string){
    return this.http.get<any>(this.apiUrl + '/scientist/recommendation/'+ orcid);
  }
}
