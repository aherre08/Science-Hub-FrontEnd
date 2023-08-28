import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminService } from '../administrator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  showOptions = false;
  esCientifico = false;

  userId: number = 0;
  userUuid: string='';
  name: string='';
  email: string='';
  active:boolean=false;

  orcid:string='';
  profession:string='';
  available:boolean=false;
  
  idOrganization: string='';
  location: string='';
  area: string='';
  


  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      
      const type = params.get('type');
      const userId = params.get('id');
      

      if (type == "scientist" && userId) {
        this.esCientifico = true;
        this.userId = parseInt(userId);

        this.adminService.obtenerCientifico(parseInt(userId)).subscribe(data => {
          console.log(data);
          this.orcid = data.orcid;
          this.userUuid = data.userUuid;
          this.name = data.name;
          this.email = data.email;
          this.profession = data.profession;
          this.available = data.available;
          this.active = data.active;
          
          
        });
      }else if(type == "organization" && userId){
        this.esCientifico = false;
        this.userId = parseInt(userId);

        this.adminService.obtenerOrganismo(parseInt(userId)).subscribe(data => {
          
          this.idOrganization = data.idOrganization.toString();
          this.userUuid = data.userUuid;
          this.name = data.name;
          this.email = data.email;
          this.location = data.location;
          this.area = data.area;
          this.active = data.active;
          
          
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

  editarCientifico(){
    const nombre = (document.getElementById('nombreCientifico') as HTMLInputElement).value;
    const profesion = (document.getElementById('profesionCientifico') as HTMLTextAreaElement).value;

    
    if (nombre.trim().length === 0 || profesion.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa todos los campos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const nuevoCientifico = {
      id: this.userId,
      orcid: this.orcid,
      userUuid: this.userUuid,
      name: nombre,
      email: this.email,
      profession: profesion,
      available: this.available,
      active: this.active
    }
    

    console.log("EL CIENTIFICO EDITADO ES:", JSON.stringify(nuevoCientifico, null, 2));

    Swal.fire({
      icon: 'question',
      title: '¿Seguro que quieres editar este científico?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.editarCientifico(this.userId, nuevoCientifico ).subscribe(
          (data: any) => {
            console.log("Se ha editado el científico satisfactoriamente");
            Swal.fire({
              icon: 'success',
              title: '¡Científico editado con éxito!',
              text: 'El científico se ha editado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['administrator/list-users']);
              }
            });
          },
          error => {
            console.error('Error al editar el científico:', error);
          }
        );
      }
    });
  }

  editarOrganismo(){
    const nombre = (document.getElementById('nombreOrganismo') as HTMLInputElement).value;
    const localidad = (document.getElementById('localidadOrganismo') as HTMLTextAreaElement).value;

    
    if (nombre.trim().length === 0 || localidad.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa todos los campos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const nuevoOrganismo = {
  
      id: this.userId,
      idOrganization: parseInt(this.idOrganization),
      userUuid: this.userUuid,
      name: nombre,
      email: this.email,
      location: localidad,
      area: this.area,
      active: this.active
    }
    

    console.log("EL ORGANISMO EDITADO ES:", JSON.stringify(nuevoOrganismo, null, 2));

    Swal.fire({
      icon: 'question',
      title: '¿Seguro que quieres editar este organismo?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.editarOrganismo(this.userId, nuevoOrganismo ).subscribe(
          (data: any) => {
            console.log("Se ha editado el organismo satisfactoriamente");
            Swal.fire({
              icon: 'success',
              title: '¡Organismo editado con éxito!',
              text: 'El organismo se ha editado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['administrator/list-users']);
              }
            });
          },
          error => {
            console.error('Error al editar el organismo:', error);
          }
        );
      }
    });
  }

}
