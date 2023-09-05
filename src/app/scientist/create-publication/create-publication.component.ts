import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScientistService } from '../scientist.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.css']
})
export class CreatePublicationComponent implements OnInit{
  showOptions = false;
  userName: string = '';

  constructor(private scientistService: ScientistService, private userService: UserService, private router: Router) {}
  
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

  ajustarExperiencia(tiempo:string) {
    const partes = tiempo.split(' ');
    const anos = parseInt(partes[0]);
    const meses = parseInt(partes[3]);

    if (anos === 0 && meses === 0) {
        return 'Sin experiencia';
    } else if (anos === 0 && meses >= 1) {
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

  realizarPublicacion() {
    const titulo = (document.getElementById('tituloPublicacion') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcionPublicacion') as HTMLTextAreaElement).value;
    const especialidad = (document.getElementById('especialidadPublicacion') as HTMLInputElement).value;
    const experienciaAños = (document.getElementById('experienciaAñosPublicacion') as HTMLInputElement).value;
    const experienciaMeses = (document.getElementById('experienciaMesesPublicacion') as HTMLInputElement).value;

    if (titulo.trim().length === 0 || descripcion.trim().length === 0 || especialidad.trim().length === 0 || experienciaAños.trim().length === 0 || experienciaMeses.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa todos los campos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const profExpertise = this.ajustarExperiencia(experienciaAños + " años y " + experienciaMeses + " meses");

    const idScientist = this.userService.getOrcid();
    

    const nuevaPublicacion = {
      "idScientist": idScientist,
      "title": titulo,
      "expertise": especialidad,
      "profExperience": profExpertise,
      "description": descripcion,
      "active": true
    };


    Swal.fire({
      icon: 'question',
      title: '¿Seguro que quieres crear una publicación?',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.scientistService.realizarPublicacion(nuevaPublicacion).subscribe(
          (response) => {
            
            Swal.fire({
              icon: 'success',
              title: '¡Publicación realizada con éxito!',
              text: 'La publicación se ha creado satisfactoriamente.',
              confirmButtonText: 'Vale'
            });
  
            (document.getElementById('tituloPublicacion') as HTMLInputElement).value = '';
            (document.getElementById('descripcionPublicacion') as HTMLTextAreaElement).value = '';
            (document.getElementById('especialidadPublicacion') as HTMLInputElement).value = '';
            (document.getElementById('experienciaAñosPublicacion') as HTMLInputElement).value = '0';
            (document.getElementById('experienciaMesesPublicacion') as HTMLInputElement).value = '0';
          },
          (error) => {
            console.error('Error al crear la publicación:', error);
          }
        );
      }
    });
  }
}
