import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { OrganizationService } from '../organization.service';
import { Cientifico } from './search-scientist.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-scientist',
  templateUrl: './search-scientist.component.html',
  styleUrls: ['./search-scientist.component.css']
})
export class SearchScientistComponent {
  showOptions = false;
  userName: string = '';
  suboptions: string | null = null;

  constructor(private organizationService: OrganizationService, private userService: UserService) {}

  ngOnInit() {
    this.userName = this.userService.getName();
    this.setupMenuButton();
    this.setupHelpAccordionButton();
    this.setupOperationsAccordionButton();
    
    this.setupAccordionListeners();
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
  
  buscarCientifico(){
    const orcid = (document.getElementById("orcidCientifico") as HTMLInputElement).value;
    
    if (orcid.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa el campo requerido.',
        confirmButtonText: 'Entendido'
      });

      // Ocultar el contenedor 
      const cientificoInfo = document.getElementById('cientificoInfo');
      if (cientificoInfo) { cientificoInfo.style.display = 'none';}

      return;
    }
    
    const expresionORCID = /^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/;
    if(!expresionORCID.test(orcid)){
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        html: 'Por favor, ingresa un ORCID con un formato válido en el campo requerido.<br>Formato: 4 grupos de 4 números separados por guiones. Ejemplo: 1234-1234-1234-1234',
        confirmButtonText: 'Entendido'
      });

      // Ocultar el contenedor 
      const cientificoInfo = document.getElementById('cientificoInfo');
      if (cientificoInfo) { cientificoInfo.style.display = 'none';}

      return;
    }

    this.organizationService.obtenerCientifico(orcid).subscribe(
      (response)=> {

        //Resetear el ORCID escrito
        (document.getElementById('orcidCientifico') as HTMLInputElement).value = '';

        // Actualizar los elementos <span> con la información de la publicación
      const orcidSpan = document.getElementById('orcidSpan');
      if (orcidSpan) {
        orcidSpan.innerText = response.orcid;
      }


      const nombreSpan = document.getElementById('nombreSpan');
      if (nombreSpan) {
        nombreSpan.innerText = response.name;
      }

      const profesionSpan = document.getElementById('profesionSpan');
      if (profesionSpan) {
        profesionSpan.innerText = response.profession;
      }

      const emailSpan = document.getElementById('emailSpan');
      if (emailSpan) {
        emailSpan.innerText = response.email;
      }

      const disponibleSpan = document.getElementById('disponibleSpan');
      if ((response.available) && disponibleSpan) {
        disponibleSpan.innerText = "Libre para incorporarse a un proyecto";
      }else if ((!response.available) && disponibleSpan){
        disponibleSpan.innerText = "Ocupado participando en un proyecto";
      }

      // Mostrar el contenedor solo si se encuentra el científico
      const cientificoInfo = document.getElementById('cientificoInfo');
      if (cientificoInfo) {
        cientificoInfo.style.display = 'block';
      }

      },
      (error) => {
        console.error('Error al encontrar el científico:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          html: 'No se ha podido encontrar un científico con el ORCID proporcionado.<br><br>Introduce el ORCID de un científico existente.',
          confirmButtonText: 'Entendido'
        });

        // Ocultar el contenedor si no se encuentra el científico
        const cientificoInfo = document.getElementById('cientificoInfo');
        if (cientificoInfo) {
          cientificoInfo.style.display = 'none';
        }

      }
    );
  }
}
