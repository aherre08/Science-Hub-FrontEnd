import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  showOptions = false;
  userName: string = '';
  orcid: string = '';
  esCientifico : boolean = false;
  

  constructor(private accountService: AccountService, public userService: UserService, private router: Router) {}
  
  ngOnInit() {
    this.userName = this.userService.getName();
    this.setupMenuButton();
    this.setupHelpAccordionButton();
    this.setupOperationsAccordionButton();
    this.setupAccordionListeners();

    
    if(this.userService.getOrcid() != ''){ // Es científico
      this.esCientifico = true;
    }else{ // Es organismo
      this.esCientifico = false;
    }

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

  editarPerfilCientifico() {
    const nombre = (document.getElementById('nombreSpan') as HTMLInputElement).value;
    const profesion = (document.getElementById('profesionSpan') as HTMLTextAreaElement).value;
  
    if (nombre.trim().length === 0 || profesion.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa todos los campos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }
  
    const userId = this.userService.getUserId();
    if (userId !== undefined) {
      const cientificoEditado = {
        id: userId,
        orcid: this.userService.getOrcid(),
        userUuid: this.userService.getUserUuid(),
        name: nombre,
        email: this.userService.getEmail(),
        profession: profesion,
        available: this.userService.getAvailable(),
        active: true
      };
  
      console.log("EL CIENTIFICO EDITADO ES:", JSON.stringify(cientificoEditado, null, 2));
  
      Swal.fire({
        icon: 'question',
        title: '¿Seguro que quieres editar tu perfil?',
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.accountService.editarPerfilCientifico(userId, cientificoEditado).subscribe(
            () => {
              this.userService.setName(nombre);
              this.userService.setProfession(profesion);
              console.log("Se ha editado el perfil satisfactoriamente");
              Swal.fire({
                icon: 'success',
                title: '¡Perfil editado con éxito!',
                text: 'El perfil se ha editado satisfactoriamente.',
                confirmButtonText: 'Vale'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['../view-profile']);
                }
              });
            },
            (error: any) => {
              console.error('Error al editar el perfil:', error);
            }
          );
        }
      });
    }
  }

  editarPerfilOrganismo(){
    const nombre = (document.getElementById('nombreSpan') as HTMLInputElement).value;
    const localidad = (document.getElementById('locationSpan') as HTMLTextAreaElement).value;
  
    if (nombre.trim().length === 0 || localidad.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa todos los campos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }
  
    const userId = this.userService.getUserId();
    if (userId !== undefined) {
      const organismoEditado = {
        id: userId,
        idOrganization: parseInt(this.userService.getOrgId()),
        userUuid: this.userService.getUserUuid(),
        name: nombre,
        email: this.userService.getEmail(),
        location: localidad,
        area: this.userService.getArea(),
        active: true
      };
  
      console.log("EL ORGANISMO EDITADO ES:", JSON.stringify(organismoEditado, null, 2));
  
      Swal.fire({
        icon: 'question',
        title: '¿Seguro que quieres editar tu perfil?',
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.accountService.editarPerfilOrganismo(userId, organismoEditado).subscribe(
            () => {
              this.userService.setName(nombre);
              this.userService.setLocation(localidad);
              console.log("Se ha editado el perfil satisfactoriamente");
              Swal.fire({
                icon: 'success',
                title: '¡Perfil editado con éxito!',
                text: 'El perfil se ha editado satisfactoriamente.',
                confirmButtonText: 'Vale'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['../view-profile']);
                }
              });
            },
            (error: any) => {
              console.error('Error al editar el perfil:', error);
            }
          );
        }
      });
    }
  }

}
