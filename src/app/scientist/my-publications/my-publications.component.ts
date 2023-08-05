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
  page: number = 1;
  itemsPerPage: number = 5;
  isPreviousDisabled: boolean = true;
  isNextDisabled: boolean = false;

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

  get paginatedPublicaciones(): any[] {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.publicaciones.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.updatePaginationStatus();
  }

  updatePaginationStatus() {
    this.isPreviousDisabled = this.page === 1;
    this.isNextDisabled = this.page === Math.ceil(this.publicaciones.length / this.itemsPerPage);
  }

  editarPublicacion(idPublicacion: number) {
    // Implementar la lógica para editar una publicación por su ID
  }

  eliminarPublicacion(idPublicacion: number) {
    // Implementar la lógica para eliminar una publicación por su ID
  }
}
