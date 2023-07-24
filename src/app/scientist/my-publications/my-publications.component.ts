import { ScientistService } from './../scientist.service';
import { ScientistModule } from './../scientist.module';
import { Component, OnInit } from '@angular/core';
import { Publicacion } from './my-publications.model';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  
  constructor(private scientistService: ScientistService){}

  ngOnInit() {
    const menuButton = document.getElementById("menuButton") as HTMLButtonElement;
    const menuContent = document.getElementById("menuContent") as HTMLDivElement;

    menuButton.addEventListener("click", () => {
      menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
    });

    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.scientistService.obtenerPublicaciones().subscribe(
      (data: Publicacion[]) => {
        this.publicaciones = data;
      },
      error => {
        console.error('Error al obtener las publicaciones:', error);
      }
    );
  }

  editarPublicacion(idPublicacion: number) {
    // Implementar la lógica para editar una publicación por su ID
  }

  eliminarPublicacion(idPublicacion: number) {
    // Implementar la lógica para eliminar una publicación por su ID
  }
}
