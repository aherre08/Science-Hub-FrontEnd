import { Component } from '@angular/core';
import { Proyecto } from 'src/app/scientist/search-organization/search-organization.model';
import { AdminService } from '../administrator.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent {
  showOptions = false;
  userName: string = '';

  proyectos: Proyecto[] = [];
  itemsPorPagina: number = 5;
  paginaActual: number = 1;

  constructor(private adminService: AdminService, private router: Router) {}
  
  ngOnInit() {
    this.setupMenuButton();
    this.setupHelpAccordionButton();
    this.setupOperationsAccordionButton();
    
    this.setupAccordionListeners();

    this.cargarProyectos();
  }

  private setupMenuButton() {
    const menuButton = document.getElementById("menuButton") as HTMLButtonElement;
    const menuContent = document.getElementById("menuContent") as HTMLDivElement;

    menuButton.addEventListener("click", () => {
      menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
    });
  }

  private setupAccordionListeners() {
    const acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function(this: HTMLElement) {
        this.classList.toggle("active");

        const panel = this.nextElementSibling as HTMLElement;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }


  setupOperationsAccordionButton(): void {
    const button = document.getElementById("operationsSubMenu");
    const icon = document.getElementById("icon");

    button?.addEventListener("click", () => {
      if (icon && icon.innerHTML.includes("bi-chevron-down")) {
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
          </svg>
        `;
      } else if (icon) {
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        `;
      }
    });
  }

  setupHelpAccordionButton(): void {
    const button = document.getElementById("helpSubMenu");
    const icon = document.getElementById("accordion-icon");

    button?.addEventListener("click", () => {
      if (icon && icon.innerHTML.includes("bi-chevron-down")) {
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
          </svg>
        `;
      } else if (icon) {
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        `;
      }
    });
  }

  cargarProyectos() {
    this.adminService.obtenerTodosProyectos().subscribe(
      (data: any) => {
        this.proyectos = data.content;
      },
      error => {
        console.error('Error al obtener los proyectos:', error);
      }
    );
  }

  get paginatedProyectos() {
    const startIndex = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.proyectos.slice(startIndex, startIndex + this.itemsPorPagina);
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
    return Math.ceil(this.proyectos.length / this.itemsPorPagina);
  }

  eliminarProyecto(idPublicacion: number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este proyecto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545', 
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.eliminarProyecto(idPublicacion).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Proyecto eliminado con éxito!',
              text: 'El proyecto se ha eliminado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                console.log('Proyecto eliminado con éxito.');
                window.location.reload();
              }
            });
          },
          error => {
            console.error('Error al eliminar el proyecto:', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Ha ocurrido un error al eliminar el proyecto',
              confirmButtonText: 'Entendido'
            });
          }
        );
      }
    });    
  }

  reactivarProyecto(idProject: number) {
    Swal.fire({
      title: '¿Seguro que quieres reactivar este proyecto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Reactivar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#53B200', 
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.reactivarProyecto(idProject).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Proyecto reactivado con éxito!',
              text: 'El proyecto se ha reactivado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                console.log('Proyecto reactivado con éxito.');
                window.location.reload();
              }
            });
          },
          error => {
            console.error('Error al reactivar el proyecto:', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Ha ocurrido un error al reactivar el proyecto',
              confirmButtonText: 'Entendido'
            });
          }
        );
      }
    }); 
  }
}
