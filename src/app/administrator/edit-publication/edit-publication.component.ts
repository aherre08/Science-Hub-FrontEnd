import { Component } from '@angular/core';
import { Publicacion } from 'src/app/scientist/my-publications/my-publications.model';
import Swal from 'sweetalert2';
import { AdminService } from '../administrator.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private adminService: AdminService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      
      const publicationId = params.get('publicationId');
      
      if (publicationId) {
        this.publicationId = parseInt(publicationId);

        this.adminService.obtenerPublicacion(parseInt(publicationId)).subscribe(data => {
          this.tituloPublicacion = data.title;
          this.descripcionPublicacion = data.description;
          this.especialidadPublicacion = data.expertise;
          this.stringExperiencia = data.profExperience;
          console.log(this.stringExperiencia);
          
          const regexAños = /(\d+)\s*años?/;
          const regexMeses = /(\d+)\s*mes(?:es)?/;
          const regexAñoyMeses = /(\d+)\s*años?\s*y\s*(\d+)\s*meses?|(\d+)\s*años?\s*y\s*(\d+)\s*mes/;
          const regexAñosMeses = /(\d+)\s*años?\s*y\s*(\d+)\s*meses?|(\d+)\s*años?\s*y\s*(\d+)\s*meses/;
          
          
          
          let matchAños = this.stringExperiencia.match(regexAños);
          if (matchAños) {
            this.expYearsPublicacion = parseInt(matchAños[1]);
            console.log(`Se detectaron ${this.expYearsPublicacion} años.`);
          }

          let matchMeses = this.stringExperiencia.match(regexMeses);
          if (matchMeses) {
            this.expMonthsPublicacion = parseInt(matchMeses[1]);
            console.log(`Se detectaron ${this.expMonthsPublicacion} meses.`);
          }

          let matchAñoyMeses = this.stringExperiencia.match(regexAñoyMeses);
          if (matchAñoyMeses) {
            this.expYearsPublicacion = parseInt(matchAñoyMeses[1] || matchAñoyMeses[3]);
            this.expMonthsPublicacion = parseInt(matchAñoyMeses[2] || matchAñoyMeses[4]);
            console.log(`Se detectaron ${this.expYearsPublicacion} años y ${this.expMonthsPublicacion} meses.`);
          }

          let matchAñosMeses = this.stringExperiencia.match(regexAñosMeses);
          if (matchAñosMeses) {
            this.expYearsPublicacion = parseInt(matchAñosMeses[1] || matchAñosMeses[3]);
            this.expMonthsPublicacion = parseInt(matchAñosMeses[2] || matchAñosMeses[4]);
            console.log(`Se detectaron ${this.expYearsPublicacion} años y ${this.expMonthsPublicacion} meses.`);
          }

          console.log("AÑO(s) -------->" + this.expYearsPublicacion);
          console.log("MES(es) -------->" + this.expMonthsPublicacion);
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

  editarPublicacion(){
    const titulo = (document.getElementById('tituloPublicacion') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcionPublicacion') as HTMLTextAreaElement).value;
    const especialidad = (document.getElementById('especialidadPublicacion') as HTMLInputElement).value;
    const experienciaAños = this.expYearsPublicacion;
    const experienciaMeses = this.expMonthsPublicacion;
    

    if (titulo.trim().length === 0 || descripcion.trim().length === 0 || especialidad.trim().length === 0 || experienciaAños.toString().trim().length === 0 || experienciaMeses.toString().trim().length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa todos los campos.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const profExperience = this.ajustarExperiencia(experienciaAños + " años y " + experienciaMeses + " meses");

    const nuevaPublicacion = {
      id: this.publicationId,
      title: titulo,
      expertise: especialidad,
      profExperience: profExperience,
      description: descripcion,
      active: true,
      initLifeDate: "",
      updateLife: ""
    }

    console.log("LA PUBLICACION EDITADA ES:", JSON.stringify(nuevaPublicacion, null, 2));

    Swal.fire({
      icon: 'question',
      title: '¿Seguro que quieres editar esta publicación?',
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.editarPublicacion(this.publicationId, nuevaPublicacion ).subscribe(
          (data: Publicacion) => {
            console.log("Se ha editado la publicacion satisfactoriamente");
            Swal.fire({
              icon: 'success',
              title: '¡Publicación editada con éxito!',
              text: 'La publicación se ha editado satisfactoriamente.',
              confirmButtonText: 'Vale'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['administrator/list-publications']);
              }
            });
          },
          error => {
            console.error('Error al editar la publicacion:', error);
          }
        );
      }
    });

    

  }
}
