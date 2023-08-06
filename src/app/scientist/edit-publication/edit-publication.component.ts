import { Component } from '@angular/core';
import { ScientistService } from '../scientist.service';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from '../my-publications/my-publications.model';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.css']
})
export class EditPublicationComponent {
  showOptions = false;
  userName: string = '';

  
  publicationId: number = 0;

  tituloPublicacion: string='';
  descripcionPublicacion: string='';
  especialidadPublicacion: string='';
  stringExperiencia:string='';
  expYearsPublicacion: number=0;
  expMonthsPublicacion: number=0;

  constructor(private scientistService: ScientistService, private userService: UserService, private route: ActivatedRoute){}

  ngOnInit() {
    this.userName = this.userService.getName();
    this.route.paramMap.subscribe(params => {
      
      const publicationId = params.get('publicationId');
      

      if (publicationId) {
        this.publicationId = parseInt(publicationId);

      this.scientistService.obtenerPublicacion(parseInt(publicationId)).subscribe(data => {
        this.tituloPublicacion = data.title;
        this.descripcionPublicacion = data.description;
        this.especialidadPublicacion = data.expertise;
        this.stringExperiencia = data.profExperience;

        const regex = /(\d+)\s+años\s+y\s+(\d+)\s+meses/;
        const match = this.stringExperiencia.match(regex);

        if (match) {
          this.expYearsPublicacion = parseInt(match[1]);
          this.expMonthsPublicacion = parseInt(match[2]);
        }else{
          this.expYearsPublicacion = 0;
          this.expMonthsPublicacion = 0;
        }

      });
    }
    });
    const menuButton = document.getElementById("menuButton") as HTMLButtonElement;
    const menuContent = document.getElementById("menuContent") as HTMLDivElement;

    menuButton.addEventListener("click", () => {
      menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
    });
  }

  editarPublicacion(){
    const titulo = (document.getElementById('tituloPublicacion') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcionPublicacion') as HTMLTextAreaElement).value;
    const especialidad = (document.getElementById('especialidadPublicacion') as HTMLInputElement).value;
    const experienciaAños = (document.getElementById('experienciaAñosPublicacion') as HTMLInputElement).value;
    const experienciaMeses = (document.getElementById('experienciaMesesPublicacion') as HTMLInputElement).value;

    const profExpertise = experienciaAños + " años y " + experienciaMeses + " meses";

    const nuevaPublicacion = {
      id: this.publicationId,
      idScientist: this.userService.getUserId(),
      title: titulo,
      expertise: especialidad,
      profExperience: profExpertise,
      description: descripcion,
      active: true,
      initLifeDate: "2023-08-06T08:25:08.618Z",
      updateLife: "2023-08-06T08:25:08.618Z"
    }

    this.scientistService.editarPublicacion(this.publicationId, nuevaPublicacion ).subscribe(
      (data: Publicacion) => {
        console.log("Se ha editado la publicacion satisfactoriamente");
      },
      error => {
        console.error('Error al obtener las publicaciones:', error);
      }
    );
  }
}
