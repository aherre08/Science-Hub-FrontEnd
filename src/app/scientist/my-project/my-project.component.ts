import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ScientistService } from '../scientist.service';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent {
  showOptions = false;
  userName: string = '';
  projectId: number = 0;

  encontrado: boolean = false;

  tituloProyecto: string = '';
  descripcionProyecto : string = '';
  duracionProyecto : string = '';
  durAnosProyecto: number=0;
  durMesesProyecto: number=0;
  capacidadProyecto: number = 0;
  tamanioProyecto: number = 0;
  ambitoProyecto: string = '';
  subambitoProyecto: string = '';
  completo : boolean = false;


  constructor(private scientistService: ScientistService, public userService: UserService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    this.userName = this.userService.getName();

    this.scientistService.obtenerProyectoAsociadoACientifico(this.userService.getOrcid()).subscribe(
      data => {
      this.projectId = data.id;
      
        if(this.projectId == 0){this.encontrado = false;}
        else{
          this.encontrado = true;
          
          this.tituloProyecto = data.title;
          this.descripcionProyecto = data.description;
          this.capacidadProyecto = data.capacity;
          this.tamanioProyecto = data.size;
          this.ambitoProyecto = data.scope;
          this.subambitoProyecto = data.subscope;
          this.completo = data.full;
          this.duracionProyecto = data.duration;
        }

    },(error) => {
      this.encontrado = false;
      console.error('No se ha encontrado un proyecto asociado al científico:', error);
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

  dejarDeParticiparEnProyecto(){
    const orcid = this.userService.getOrcid();

    Swal.fire({
      icon: 'question',
      title: '¿Seguro que quieres dejar de participar en este proyecto?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.scientistService.dejarDeParticiparEnProyecto(orcid, this.projectId).subscribe(
          (response) => {
            
            this.userService.setIdProject(0);
            this.userService.setAvailable(true);

            location.reload();
          },
          (error) => {
            console.error('Error al participar en el proyecto:', error);
          }
        );
      }
    });
  }

  
}
