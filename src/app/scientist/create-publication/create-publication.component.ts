import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScientistService } from '../scientist.service';
import { UserService } from 'src/app/shared/user.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.css']
})
export class CreatePublicationComponent implements OnInit{
  showOptions = false;
  userName: string = '';

  constructor(private scientistService: ScientistService, private userService: UserService) {}
  
  ngOnInit() {
    this.userName = this.userService.getName();
    const menuButton = document.getElementById("menuButton") as HTMLButtonElement;
    const menuContent = document.getElementById("menuContent") as HTMLDivElement;

    menuButton.addEventListener("click", () => {
      menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
    });
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
        text: 'Por favor, completa todos los campos requeridos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const profExpertise = experienciaAños + " años y " + experienciaMeses + " meses";
    const idScientist = this.userService.getOrcid();
    

    const nuevaPublicacion = {
      "idScientist": idScientist,
      "title": titulo,
      "expertise": especialidad,
      "profExpertise": profExpertise,
      "description": descripcion,
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
            console.log('Publicación creada con éxito:', response);
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
            (document.getElementById('experienciaMesesPublicacion') as HTMLInputElement).value = '1';
          },
          (error) => {
            console.error('Error al crear la publicación:', error);
          }
        );
      }
    });
  }
}
