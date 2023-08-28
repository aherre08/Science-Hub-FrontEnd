import { Component } from '@angular/core';
import { ScientistService } from '../scientist.service';
import { UserService } from 'src/app/shared/user.service';
import { Organismo, Proyecto } from './search-organization.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-organization',
  templateUrl: './search-organization.component.html',
  styleUrls: ['./search-organization.component.css']
})
export class SearchOrganizationComponent {
  showOptions = false;
  userName: string = '';

  mostrarResultados=false;
  noResultados = false;
  listaProyectos = false;
  noProyectos = false;
  
  organismos: Organismo[] = [];
  proyectos: Proyecto[] = [];

  constructor(private scientistService: ScientistService, private userService: UserService, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.userName = this.userService.getName();
    this.setupMenuButton();
    this.setupHelpAccordionButton();
    this.setupOperationsAccordionButton();
    this.setupAccordionListeners();

    this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.realizarBusqueda(searchTerm);
      } 
    });

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

  buscarOrganismo(){
    const nombreOrg = (document.getElementById('nombreOrganismo') as HTMLInputElement).value;
    if (nombreOrg.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, rellena el campo requerido.',
        confirmButtonText: 'Entendido'
      });

      this.mostrarResultados = false;
      this.listaProyectos = false;

      return;
    }

    this.scientistService.buscarOrganismo(nombreOrg).subscribe(
      (data: Organismo[]) => {
        
        this.mostrarResultados = true;
        this.listaProyectos = false;

        if(data.length == 0){
          this.noResultados = true;
        }else{
          this.noResultados = false;
          this.organismos = data;
        }

        if (nombreOrg.trim().length > 0) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { search: nombreOrg },
            queryParamsHandling: 'merge'
          });
        }
        

      },
      error => {
        console.error('Error al obtener los resultados:', error);
      }
    );
  }

  listarProyectos(orgId: number){
    
    this.scientistService.obtenerProyectos(orgId.toString()).subscribe(
      (data: Proyecto[]) => {
        
        this.listaProyectos = true;
    
        if(data.length == 0){
          this.noProyectos = true;
        }else{
          this.noProyectos = false;
          this.proyectos = data;
        }

      },
      error => {
        console.error('Error al obtener los resultados:', error);
        this.listaProyectos = false;
      }
    );

  }

  realizarBusqueda(searchTerm: string) {
    const nombreOrganismo = document.getElementById('nombreOrganismo') as HTMLInputElement;
    if (nombreOrganismo) {
      nombreOrganismo.value = searchTerm;
    }

    this.scientistService.buscarOrganismo(searchTerm).subscribe(
      (data: Organismo[]) => {
        this.mostrarResultados = true;
        this.listaProyectos = false;
  
        if (data.length == 0) {
          this.noResultados = true;
        } else {
          this.noResultados = false;
          this.organismos = data;
        }
      },
      error => {
        console.error('Error al obtener los resultados:', error);
      }
    );
  }

  mostrarProyectoEnDetalle(projectId: number) {
    const nombreOrg = (document.getElementById('nombreOrganismo') as HTMLInputElement).value;
    this.router.navigate(['../show-project', projectId], {
      relativeTo: this.route,
      queryParams: { search: nombreOrg }
    });
  }
}
