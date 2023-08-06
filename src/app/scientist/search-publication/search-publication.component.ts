import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ScientistService } from '../scientist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-publication',
  templateUrl: './search-publication.component.html',
  styleUrls: ['./search-publication.component.css']
})
export class SearchPublicationComponent {
  showOptions = false;
  userName: string = '';

  constructor(private scientistService: ScientistService, private userService: UserService){}
  
  ngOnInit() {
    this.userName = this.userService.getName();
    const menuButton = document.getElementById("menuButton") as HTMLButtonElement;
    const menuContent = document.getElementById("menuContent") as HTMLDivElement;

    menuButton.addEventListener("click", () => {
      menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
    });

  }

  buscarPublicacion(){
    const idPublicacionStr = (document.getElementById("idPublicacion") as HTMLInputElement).value;
    
    if (idPublicacionStr.trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa el campo requerido.',
        confirmButtonText: 'Entendido'
      });

      // Ocultar el contenedor 
      const publicacionInfo = document.getElementById('publicacionInfo');
      if (publicacionInfo) { publicacionInfo.style.display = 'none';}

      return;
    }
    
    const idPublicacion = parseInt(idPublicacionStr);

    if (isNaN(idPublicacion)) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, ingresa un número válido en el campo requerido.',
        confirmButtonText: 'Entendido'
      });

      // Ocultar el contenedor 
        const publicacionInfo = document.getElementById('publicacionInfo');
        if (publicacionInfo) { publicacionInfo.style.display = 'none';}

      return;
    }

    this.scientistService.obtenerPublicacion(idPublicacion).subscribe(
      (response)=> {
        console.log('Publicación encontrada con éxito:', response);
        (document.getElementById('idPublicacion') as HTMLInputElement).value = '';

        // Actualizar los elementos <span> con la información de la publicación
      const idPublicacionSpan = document.getElementById('idPublicacionSpan');
      if (idPublicacionSpan) {
        idPublicacionSpan.innerText = (response.id).toString();
      }

      const tituloSpan = document.getElementById('tituloSpan');
      if (tituloSpan) {
        tituloSpan.innerText = response.title;
      }

      const descripcionSpan = document.getElementById('descripcionSpan');
      if (descripcionSpan) {
        descripcionSpan.innerText = response.description;
      }

      const especialidadSpan = document.getElementById('especialidadSpan');
      if (especialidadSpan) {
        especialidadSpan.innerText = response.expertise;
      }

      const experienciaSpan = document.getElementById('experienciaSpan');
      if (experienciaSpan) {
        experienciaSpan.innerText = response.profExperience;
      }

      const ultimaModificacionSpan = document.getElementById('ultimaModificacionSpan');
      if (ultimaModificacionSpan) {
        if(response.updateLife != null){
          ultimaModificacionSpan.innerText = this.convertirFormatoHora(response.updateLife);
        }else{
          ultimaModificacionSpan.innerText = this.convertirFormatoHora(response.initLifeDate);
        }
      }

      // Mostrar el contenedor solo si se encuentra la publicación
      const publicacionInfo = document.getElementById('publicacionInfo');
      if (publicacionInfo) {
        publicacionInfo.style.display = 'block';
      }

      },
      (error) => {
        console.error('Error al encontrar la publicación:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'No se ha podido encontrar una publicacion con el ID proporcionado./n Introduce el ID de una publicación existente.',
          confirmButtonText: 'Entendido'
        });

        // Ocultar el contenedor si no se encuentra la publicación
        const publicacionInfo = document.getElementById('publicacionInfo');
        if (publicacionInfo) {
          publicacionInfo.style.display = 'none';
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
