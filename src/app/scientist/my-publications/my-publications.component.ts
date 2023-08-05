import { UserService } from 'src/app/shared/user.service';
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
  itemsPerPage = 5;
  currentPage = 1;

  constructor(private scientistService: ScientistService, private userService: UserService){}

  ngOnInit() {
    const menuButton = document.getElementById("menuButton") as HTMLButtonElement;
    const menuContent = document.getElementById("menuContent") as HTMLDivElement;

    menuButton.addEventListener("click", () => {
      menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
    });

    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    this.scientistService.obtenerPublicaciones(this.userService.getOrcid()).subscribe(
      (data: Publicacion[]) => {
        this.publicaciones = data;
      },
      error => {
        console.error('Error al obtener las publicaciones:', error);
      }
    );
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  get paginatedPublicaciones(): Publicacion[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.publicaciones.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get isPreviousDisabled(): boolean {
    return this.currentPage === 1;
  }

  get isNextDisabled(): boolean {
    return this.currentPage === Math.ceil(this.publicaciones.length / this.itemsPerPage);
  }

  editarPublicacion(idPublicacion: number) {
    // Implementar la lógica para editar una publicación por su ID
  }

  eliminarPublicacion(idPublicacion: number) {
    // Implementar la lógica para eliminar una publicación por su ID
  }
}
