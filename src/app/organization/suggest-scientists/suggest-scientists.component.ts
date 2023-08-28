import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { OrganizationService } from '../organization.service';
import { Cientifico } from '../search-scientist/search-scientist.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suggest-scientists',
  templateUrl: './suggest-scientists.component.html',
  styleUrls: ['./suggest-scientists.component.css']
})
export class SuggestScientistsComponent {
  showOptions = false;
  userName: string = '';
  suboptions: string | null = null;

  cientificos: Cientifico[]=[];
  buscados: boolean = false;
  encontrados: boolean = false;
  idProyecto: number = 0;

  constructor(private organizationService: OrganizationService, private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userName = this.userService.getName();
    this.setupMenuButton();
    this.setupHelpAccordionButton();
    this.setupOperationsAccordionButton();
    this.setupAccordionListeners();

    this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.idProyecto = searchTerm;
        this.cargarCientificos(searchTerm);
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

  recomendarCientificos(){
    const idProyectoStr = (document.getElementById("idProyecto") as HTMLInputElement).value;
    
    if (idProyectoStr.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa el campo requerido.',
        confirmButtonText: 'Entendido'
      });

       
      // Ocultar el contenedor 
      const cientificosRecomendados = document.getElementById('cientificosRecomendados');
      if (cientificosRecomendados) { cientificosRecomendados.style.display = 'none';}
      this.buscados = false;
      
      return;
    }
    
    const idProyecto = parseInt(idProyectoStr);
    this.idProyecto = idProyecto;

    if (isNaN(idProyecto)) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, ingresa un número válido en el campo requerido.',
        confirmButtonText: 'Entendido'
      });

      // Ocultar el contenedor 
        const cientificosRecomendados = document.getElementById('cientificosRecomendados');
        if (cientificosRecomendados) { cientificosRecomendados.style.display = 'none';}
        this.buscados = false;

      return;
    }
    
    this.organizationService.recomendarCientificos(idProyecto).subscribe(
      (response: any) => {
        console.log(response);
        this.encontrados = true;
        this.buscados = true;
        this.cientificos = response.content;
        
      },
      (error) => {
        console.error('Error al recomendar cientificos:', error);
        this.encontrados = false;
        this.buscados = true;
      }
    );
  }

  mostrarCientificoEnDetalle(orcid:string) {
    this.router.navigate(['../show-scientist', orcid], {
      relativeTo: this.route,
      queryParams: { search: this.idProyecto }
    });
  }

  cargarCientificos(searchTerm: number) {

    const idProyecto = document.getElementById('idProyecto') as HTMLInputElement;
    if (idProyecto) {
      idProyecto.value = searchTerm.toString();
    }
    
    this.organizationService.recomendarCientificos(searchTerm).subscribe(
      (response: any) => {
        console.log(response);
        this.encontrados = true;
        this.buscados = true;
        this.cientificos = response.content;
        
      },
      (error) => {
        console.error('Error al recomendar cientificos:', error);
        this.encontrados = false;
        this.buscados = true;
      }
    );
  }

}
