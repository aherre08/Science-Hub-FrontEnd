import { Component, ElementRef } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publish-project',
  templateUrl: './publish-project.component.html',
  styleUrls: ['./publish-project.component.css']
})
export class PublishProjectComponent {
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

  ajustarDuracion(tiempo:string) {
    const partes = tiempo.split(' ');
    const anos = parseInt(partes[0]);
    const meses = parseInt(partes[3]);

    if (anos === 0 && meses >= 1) {
        return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
    } else if (anos >= 1 && meses === 0) {
        return `${anos} ${anos === 1 ? 'año' : 'años'}`;
    } else {
        let resultado = tiempo;

        if (anos === 1) {
            resultado = resultado.replace('años', 'año');
        }

        if (meses === 1) {
            resultado = resultado.replace('meses', 'mes');
        }

        return resultado.toString();
    }
  }

  publicarProyecto() {
    const titulo = (document.getElementById('tituloProyecto') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcionProyecto') as HTMLTextAreaElement).value;
    const capacidad = (document.getElementById('capacidadProyecto') as HTMLInputElement).value;
    const duracionAños = (document.getElementById('duracionAñosProyecto') as HTMLInputElement).value;
    const duracionMeses = (document.getElementById('duracionMesesProyecto') as HTMLInputElement).value;
    const ambito = (document.getElementById('ambitoProyecto') as HTMLInputElement).value;
    const subambito = (document.getElementById('subambitoProyecto') as HTMLInputElement).value;

    if (titulo.trim().length === 0 || descripcion.trim().length === 0 || capacidad.trim().length === 0 || duracionAños.trim().length === 0 || duracionMeses.trim().length === 0 || ambito.trim().length === 0|| subambito.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa todos los campos requeridos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const duration = this.ajustarDuracion(duracionAños + " años y " + duracionMeses + " meses");
    const idOrganization = this.userService.getOrgId();
    

    const nuevoProyecto = {
      "idOrganization": idOrganization,
      "title": titulo,
      "description": descripcion,
      "capacity": capacidad,
      "scope": ambito,
      "subscope": subambito,
      "duration": duration,
      "active": true
    };

    Swal.fire({
      icon: 'question',
      title: '¿Seguro que quieres publicar un proyecto?',
      showCancelButton: true,
      confirmButtonText: 'Publicar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.organizationService.publicarProyecto(nuevoProyecto).subscribe(
          (response) => {
  
            (document.getElementById('tituloProyecto') as HTMLInputElement).value = '';
            (document.getElementById('descripcionProyecto') as HTMLTextAreaElement).value = '';
            (document.getElementById('capacidadProyecto') as HTMLInputElement).value = '2';
            (document.getElementById('duracionAñosProyecto') as HTMLInputElement).value = '0';
            (document.getElementById('duracionMesesProyecto') as HTMLInputElement).value = '1';
            (document.getElementById('ambitoProyecto') as HTMLInputElement).value = '';
            (document.getElementById('subambitoProyecto') as HTMLInputElement).value = '';
            
            Swal.fire({
              icon: 'success',
              title: '¡Proyecto publicado con éxito!',
              text: 'El proyecto se ha publicado correctamente.',
              confirmButtonText: 'Vale'
            });
  
            
          },
          (error) => {
            console.error('Error al publicar el proyecto:', error);
          }
        );
      }
    });
  }
}
