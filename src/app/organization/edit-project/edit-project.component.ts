import { Component } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../my-projects/my-projects.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  showOptions = false;
  userName: string = '';

  projectId: number = 0;

  tituloProyecto: string='';
  descripcionProyecto: string='';
  capacidadProyecto: string='';
  ambitoProyecto:string='';
  subambitoProyecto:string='';
  stringDuracion:string='';
  durAnosProyecto: number=0;
  durMesesProyecto: number=0;


  constructor(private organizationService: OrganizationService, private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.userName = this.userService.getName();
    this.route.paramMap.subscribe(params => {
      
      const projectId = params.get('projectId');
      
      if (projectId) {
        this.projectId = parseInt(projectId);

        this.organizationService.obtenerProyecto(parseInt(projectId)).subscribe(data => {
          this.tituloProyecto = data.title;
          this.descripcionProyecto = data.description;
          this.capacidadProyecto = data.capacity;
          this.ambitoProyecto = data.scope;
          this.subambitoProyecto = data.subscope;
          this.stringDuracion = data.duration;
          
          const regexAños = /(\d+)\s*años?/;
          const regexMeses = /(\d+)\s*mes(?:es)?/;
          const regexAñoyMeses = /(\d+)\s*años?\s*y\s*(\d+)\s*meses?|(\d+)\s*años?\s*y\s*(\d+)\s*mes/;
          const regexAñosMeses = /(\d+)\s*años?\s*y\s*(\d+)\s*meses?|(\d+)\s*años?\s*y\s*(\d+)\s*meses/;
          
          
          
          let matchAños = this.stringDuracion.match(regexAños);
          if (matchAños) {
            this.durAnosProyecto = parseInt(matchAños[1]);
          }

          let matchMeses = this.stringDuracion.match(regexMeses);
          if (matchMeses) {
            this.durMesesProyecto = parseInt(matchMeses[1]);
          }

          let matchAñoyMeses = this.stringDuracion.match(regexAñoyMeses);
          if (matchAñoyMeses) {
            this.durAnosProyecto = parseInt(matchAñoyMeses[1] || matchAñoyMeses[3]);
            this.durMesesProyecto = parseInt(matchAñoyMeses[2] || matchAñoyMeses[4]);
          }

          let matchAñosMeses = this.stringDuracion.match(regexAñosMeses);
          if (matchAñosMeses) {
            this.durAnosProyecto = parseInt(matchAñosMeses[1] || matchAñosMeses[3]);
            this.durMesesProyecto = parseInt(matchAñosMeses[2] || matchAñosMeses[4]);
          }
          
        });
      }
    });

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

  editarProyecto(){
    const titulo = (document.getElementById('tituloProyecto') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcionProyecto') as HTMLTextAreaElement).value;
    const capacidad = (document.getElementById('capacidadProyecto') as HTMLInputElement).value;
    const ambito = (document.getElementById('ambitoProyecto') as HTMLInputElement).value;
    const duracionAños = this.durAnosProyecto;
    const duracionMeses = this.durMesesProyecto;
    const subambito = (document.getElementById('subambitoProyecto') as HTMLInputElement).value;
    
    if (titulo.trim().length === 0 || descripcion.trim().length === 0 || capacidad.trim().length === 0 || ambito.trim().length === 0 || duracionAños.toString().trim().length === 0 || duracionMeses.toString().trim().length === 0 || subambito.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa todos los campos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const duracion = this.ajustarDuracion(duracionAños + " años y " + duracionMeses + " meses");

    const nuevoProyecto = {
      id: this.projectId,
      idOrganization: this.userService.getOrgId(),
      title: titulo,
      description: descripcion,
      duration: duracion,
      capacity: capacidad,
      scope: ambito,
      subscope: subambito,
      active: true,
      initLifeDate: "",
      updateLife: ""
    }

    console.log("EL PROYECTO EDITADO ES:", JSON.stringify(nuevoProyecto, null, 2));

    Swal.fire({
      icon: 'question',
      title: '¿Seguro que quieres editar este proyecto?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.organizationService.editarProyecto(this.projectId, nuevoProyecto ).subscribe(
          (data: Proyecto) => {
            console.log("Se ha editado el proyecto satisfactoriamente");
            Swal.fire({
              icon: 'success',
              title: '¡Proyecto editado con éxito!',
              text: 'El proyecto se ha editado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['organization/my-projects']);
              }
            });
          },
          error => {
            console.error('Error al editar el proyecto:', error);
          }
        );
      }
    });
  }


}
