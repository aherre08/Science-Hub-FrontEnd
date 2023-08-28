import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { OrganizationService } from '../organization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent {
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

  buscarProyecto(){
    const idProyectoStr = (document.getElementById("idProyecto") as HTMLInputElement).value;
    
    if (idProyectoStr.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa el campo requerido.',
        confirmButtonText: 'Entendido'
      });

      // Ocultar el contenedor 
      const proyectoInfo = document.getElementById('proyectoInfo');
      if (proyectoInfo) { proyectoInfo.style.display = 'none';}

      return;
    }
    
    const idProyecto = parseInt(idProyectoStr);

    if (isNaN(idProyecto)) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, ingresa un número válido en el campo requerido.',
        confirmButtonText: 'Entendido'
      });

      // Ocultar el contenedor 
        const proyectoInfo = document.getElementById('proyectoInfo');
        if (proyectoInfo) { proyectoInfo.style.display = 'none';}

      return;
    }

    this.organizationService.obtenerProyecto(idProyecto).subscribe(
      (response)=> {
        console.log('Proyecto encontrado con éxito:', response);
        (document.getElementById('idProyecto') as HTMLInputElement).value = '';

        // Actualizar los elementos <span> con la información del proyecto
      const idProyectoSpan = document.getElementById('idProyectoSpan');
      if (idProyectoSpan) {
        idProyectoSpan.innerText = (response.id).toString();
      }

      const ultimaModificacionSpan = document.getElementById('ultimaModificacionSpan');
      if (ultimaModificacionSpan) {
        if(response.updateLife != null){
          ultimaModificacionSpan.innerText = this.convertirFormatoHora(response.updateLife);
        }else{
          ultimaModificacionSpan.innerText = this.convertirFormatoHora(response.initLifeDate);
        }
      }

      const tituloSpan = document.getElementById('tituloSpan');
      if (tituloSpan) {
        tituloSpan.innerText = response.title;
      }

      const descripcionSpan = document.getElementById('descripcionSpan');
      if (descripcionSpan) {
        descripcionSpan.innerText = response.description;
      }

      const capacidadSpan = document.getElementById('capacidadSpan');
      if (capacidadSpan) {
        capacidadSpan.innerText = (response.capacity).toString();
      }

      const ambitoSpan = document.getElementById('ambitoSpan');
      if (ambitoSpan) {
        ambitoSpan.innerText = response.scope;
      }

      const duracionSpan = document.getElementById('duracionSpan');
      if (duracionSpan) {
        duracionSpan.innerText = response.duration;
      }

      const subambitoSpan = document.getElementById('subambitoSpan');
      if (subambitoSpan) {
        subambitoSpan.innerText = response.subscope;
      }
      

      // Mostrar el contenedor solo si se encuentra el proyecto
      const proyectoInfo = document.getElementById('proyectoInfo');
      if (proyectoInfo) {
        proyectoInfo.style.display = 'block';
      }

      },
      (error) => {
        console.error('Error al encontrar el proyecto:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          html: 'No se ha podido encontrar un proyecto con el ID proporcionado.<br><br>Introduce el ID de un proyecto existente y activo.',
          confirmButtonText: 'Entendido'
        });

        // Ocultar el contenedor si no se encuentra el proyecto
        const proyectoInfo = document.getElementById('proyectoInfo');
        if (proyectoInfo) {
          proyectoInfo.style.display = 'none';
        }

      }
    );
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
}
