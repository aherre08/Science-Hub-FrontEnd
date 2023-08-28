import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../administrator.service';
import { Router } from '@angular/router';
import { Cientifico } from 'src/app/organization/search-scientist/search-scientist.model';
import { Organismo } from 'src/app/scientist/search-organization/search-organization.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  showOptions = false;
  userName: string = '';

  cientificos: Cientifico[] = [];
  itemsPorPaginaCientifico: number = 5;
  paginaActualCientifico: number = 1;
  
  organismos: Organismo[] = [];
  itemsPorPaginaOrganismo: number = 5;
  paginaActualOrganismo: number = 1;

  constructor(private adminService: AdminService, private router: Router) {}
  
  ngOnInit() {
    this.setupMenuButton();
    this.setupHelpAccordionButton();
    this.setupOperationsAccordionButton();
    
    this.setupAccordionListeners();

    this.cargarUsuarios();
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

  cargarUsuarios() {
    this.adminService.obtenerTodosCientificos().subscribe(
      (data: Cientifico[]) => {
        this.cientificos = data;
      },
      error => {
        console.error('Error al obtener los cientificos:', error);
      }
    );

    this.adminService.obtenerTodosOrganismos().subscribe(
      (data: Organismo[]) => {
        this.organismos = data;
      },
      error => {
        console.error('Error al obtener los cientificos:', error);
      }
    );
  }

  get paginatedCientificos() {
    const startIndex = (this.paginaActualCientifico - 1) * this.itemsPorPaginaCientifico;
    return this.cientificos.slice(startIndex, startIndex + this.itemsPorPaginaCientifico);
  }

  get paginatedOrganismos() {
    const startIndex = (this.paginaActualOrganismo - 1) * this.itemsPorPaginaOrganismo;
    return this.organismos.slice(startIndex, startIndex + this.itemsPorPaginaOrganismo);
  }


  siguientePaginaCientifico() {
    if (this.paginaActualCientifico < this.paginasTotalesCientificos) {
      this.paginaActualCientifico++;
    }
  }

  siguientePaginaOrganismo() {
    if (this.paginaActualOrganismo < this.paginasTotalesOrganismos) {
      this.paginaActualOrganismo++;
    }
  }

  anteriorPaginaCientifico() {
    if (this.paginaActualCientifico > 1) {
      this.paginaActualCientifico--;
    }
  }

  anteriorPaginaOrganismo() {
    if (this.paginaActualOrganismo > 1) {
      this.paginaActualOrganismo--;
    }
  }

  get paginasTotalesCientificos() {
    return Math.ceil(this.cientificos.length / this.itemsPorPaginaCientifico);
  }

  get paginasTotalesOrganismos() {
    return Math.ceil(this.organismos.length / this.itemsPorPaginaOrganismo);
  }

  eliminarCientifico(orcid: string) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este científico?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545', 
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.eliminarCientifico(orcid).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Científico eliminado con éxito!',
              text: 'El científico se ha eliminado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                console.log('Científico eliminado con éxito.');
                window.location.reload();
              }
            });
          },
          error => {
            console.error('Error al eliminar el científico:', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Ha ocurrido un error al eliminar el científico',
              confirmButtonText: 'Entendido'
            });
          }
        );
      }
    });    
  }

  eliminarOrganismo(idOrganization: number) {
    Swal.fire({
      title: '¿Seguro que quieres eliminar este organismo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545', 
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.eliminarOrganismo(idOrganization).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Organismo eliminado con éxito!',
              text: 'El organismo se ha eliminado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                console.log('Organismo eliminado con éxito.');
                window.location.reload();
              }
            });
          },
          error => {
            console.error('Error al eliminar el organismo:', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Ha ocurrido un error al eliminar el organismo',
              confirmButtonText: 'Entendido'
            });
          }
        );
      }
    });    
  }


  reactivarCientifico(orcid: string) {
    Swal.fire({
      title: '¿Seguro que quieres reactivar este científico?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Reactivar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#53B200', 
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.reactivarCientifico(orcid).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Científico reactivado con éxito!',
              text: 'El científico se ha reactivado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                console.log('Científico reactivado con éxito.');
                window.location.reload();
              }
            });
          },
          error => {
            console.error('Error al reactivar el científico:', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Ha ocurrido un error al reactivar el científico',
              confirmButtonText: 'Entendido'
            });
          }
        );
      }
    }); 
  }

  reactivarOrganismo(idOrganization: string) {
    Swal.fire({
      title: '¿Seguro que quieres reactivar este organismo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Reactivar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#53B200', 
      cancelButtonColor: '#6c757d',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.reactivarOrganismo(idOrganization).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Organismo reactivado con éxito!',
              text: 'El organismo se ha reactivado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                console.log('Organismo reactivado con éxito.');
                window.location.reload();
              }
            });
          },
          error => {
            console.error('Error al reactivar el organismo:', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Ha ocurrido un error al reactivar el organismo',
              confirmButtonText: 'Entendido'
            });
          }
        );
      }
    }); 
  }

}
