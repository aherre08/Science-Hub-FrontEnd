import { Proyecto } from './../search-organization/search-organization.model';
import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ScientistService } from '../scientist.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent {
  showOptions = false;
  userName: string = '';
  projectId: number = 0;

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

  terminoDeBusqueda: string = '';

  recomendacion: boolean = false;
  esMiProyecto: boolean = false;

  constructor(private scientistService: ScientistService, public userService: UserService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    // Almacenar término de búsqueda para poder volver a Buscar Organismo con la búsqueda hecha
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    this.terminoDeBusqueda = searchParam !== null && searchParam !== '' ? searchParam : '';

    this.userName = this.userService.getName();
    this.route.paramMap.subscribe(params => {
      
      const projectId = params.get('projectId');
      const search = this.route.snapshot.queryParamMap.get('search');
      
      
      if(search == null){
        this.recomendacion = true;
      }
      else{ this.recomendacion = false;}
      
      if (projectId) {
        this.projectId = parseInt(projectId);

        this.scientistService.obtenerProyecto(parseInt(projectId)).subscribe(data => {
    
          this.tituloProyecto = data.title;
          this.descripcionProyecto = data.description;
          this.capacidadProyecto = data.capacity;
          this.tamanioProyecto = data.size;
          this.ambitoProyecto = data.scope;
          this.subambitoProyecto = data.subscope;
          this.completo = data.full;
          this.duracionProyecto = data.duration;


          this.ajustarParticipacion(this.tamanioProyecto, this.capacidadProyecto);
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

  ajustarParticipacion(tamanioProyecto:number, capacidadProyecto:number){

    const participoButton = document.getElementById("participoButton");

    if(participoButton != null){

      const available = this.userService.getAvailable();

      if((this.userService.getIdProject() === this.projectId) && (available == false)){
        this.esMiProyecto = true;
        participoButton.textContent = "¡Ya estás participando en este proyecto!";
        participoButton.setAttribute("disabled", "true");
        participoButton.removeEventListener("click", this.participarEnProyecto);
      }else if ((this.userService.getIdProject() != 0) && (this.userService.getIdProject() != this.projectId) && (available == false)){
        this.esMiProyecto = false;
        participoButton.textContent = "¡Ya estás participando en otro proyecto!";
        participoButton.setAttribute("disabled", "true");
        participoButton.removeEventListener("click", this.participarEnProyecto);
      }else if (tamanioProyecto === capacidadProyecto) {
        participoButton.textContent = "¡Proyecto completo!";
        participoButton.setAttribute("disabled", "true");
        participoButton.style.backgroundColor = "red";
        participoButton.removeEventListener("click", this.participarEnProyecto);
      }else if((tamanioProyecto < capacidadProyecto) && (available) ) {
        this.esMiProyecto = false;
          participoButton.textContent = "¡Quiero participar!";
          participoButton.removeAttribute("disabled");
      } 
    }
    
  }

  participarEnProyecto(){
    const orcid = this.userService.getOrcid();

    Swal.fire({
      icon: 'question',
      title: '¿Seguro que quieres participar en este proyecto?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.scientistService.apuntarEnProyecto(orcid, this.projectId).subscribe(
          (response) => {
  
            this.userService.setIdProject(this.projectId);
            this.userService.setAvailable(false);

            location.reload();
          },
          (error) => {
            console.error('Error al participar en el proyecto:', error);
          }
        );
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
            console.log("EL CIENTIFICO CON ORCID: " + orcid + "DEJA DE PARTICIPAR EN EL PROYECTO " + this.projectId);
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
