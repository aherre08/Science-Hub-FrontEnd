import { UserService } from 'src/app/shared/user.service';
import { ScientistService } from './../scientist.service';
import { ScientistModule } from './../scientist.module';
import { Component, OnInit } from '@angular/core';
import { Publicacion } from './my-publications.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {
  showOptions = false;
  userName: string = '';
  
  publicaciones: Publicacion[] = [];
  itemsPorPagina: number = 7;
  paginaActual: number = 1;


  constructor(private scientistService: ScientistService, private userService: UserService, private router: Router,){}

  ngOnInit() {
    this.userName = this.userService.getName();
    const menuButton = document.getElementById("menuButton") as HTMLButtonElement;
    const menuContent = document.getElementById("menuContent") as HTMLDivElement;

    menuButton.addEventListener("click", () => {
      menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
    });

    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.scientistService.obtenerPublicaciones(this.userService.getOrcid()).subscribe(
      (data: Publicacion[]) => {
        this.publicaciones = data;
      },
      error => {
        console.error('Error al obtener las publicaciones:', error);
      }
    );
  }

  get paginatedPublicaciones() {
    const startIndex = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.publicaciones.slice(startIndex, startIndex + this.itemsPorPagina);
  }

  convertirFormatoHora(initLifeDate: string | number | Date) {
    let fechaHora;
  
    if (typeof initLifeDate === 'string') {
      fechaHora = new Date(initLifeDate);
    } else if (initLifeDate instanceof Date) {
      fechaHora = initLifeDate;
    } else {
      fechaHora = new Date(initLifeDate);
    }
  
    // Verificar si fechaHora es una fecha válida
    if (isNaN(fechaHora.getTime())) {
      return ''; 
    }
  
    const dia = fechaHora.getDate();
    const mes = fechaHora.getMonth() + 1;
    const anio = fechaHora.getFullYear();
    const horas = fechaHora.getHours();
    const minutos = fechaHora.getMinutes();
    const segundos = fechaHora.getSeconds();
  
    // Formatear en el nuevo formato
    const formatoNuevo = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio} - ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  
    return formatoNuevo;
  }

  siguientePagina() {
    if (this.paginaActual < this.paginasTotales) {
      this.paginaActual++;
    }
  }

  anteriorPagina() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  get paginasTotales() {
    return Math.ceil(this.publicaciones.length / this.itemsPorPagina);
  }

  eliminarPublicacion(idPublicacion: number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar esta publicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545', 
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.scientistService.eliminarPublicacion(idPublicacion).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Publicación eliminada con éxito!',
              text: 'La publicación se ha eliminado satisfactoriamente.',
              confirmButtonText: 'Vale'
            });
            console.log('Publicación eliminada con éxito.');
            
          },
          error => {
            console.error('Error al eliminar la publicación:', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Ha ocurrido un error al eliminar la publicación',
              confirmButtonText: 'Entendido'
            });
          }
        );
      }
    });    
  }
}
