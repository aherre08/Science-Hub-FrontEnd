import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

interface FAQ {
  question: string;
  answer: string;
  showAnswer: boolean;
  selected:boolean;
}

interface Section {
  title: string;
  faqs: FAQ[];
}

@Component({
  selector: 'app-help-faq',
  templateUrl: './help-faq.component.html',
  styleUrls: ['./help-faq.component.css']
})

export class HelpFaqComponent {
  showOptions = false;
  userName: string = '';
  orcid: string = '';
  esCientifico : boolean = false;

  constructor(public userService: UserService) {}
  
  ngOnInit() {
    
    this.userName = this.userService.getName();
    this.setupMenuButton();
    this.setupHelpAccordionButton();
    this.setupOperationsAccordionButton();
    this.setupAccordionListeners();

    
    if(this.userService.getOrcid() != ''){ 
      this.esCientifico = true;
    }else{
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

  toggleAnswer(faq: FAQ) {
    faq.showAnswer = !faq.showAnswer;
    faq.selected = !faq.selected;
  }

  sectionsScientist: Section[] = [
    {
      title: 'Crear y gestionar publicaciones',
      faqs: [
        { question: '¿Cómo puedo crear una nueva publicación para buscar proyectos en los que trabajar?', answer: "Puedes crearla a rellenando el formulario presente en 'Crear publicación'.", showAnswer: false, selected: false },
        { question: '¿Puedo editar el contenido de una publicación después de haberla creado?', answer: "Sí, puedes editar el contenido. <br> En 'Mis publicaciones', selecciona el botón de 'Editar' en la publicación que quieras editar.", showAnswer: false, selected: false },
        { question: '¿Cómo elimino una publicación que ya no es relevante para mí?', answer: "En 'Mis publicaciones', selecciona el botón 'Eliminar' de la publicación que desees eliminar.", showAnswer: false, selected: false },
      ]
    },
    {
      title: 'Búsqueda y visualización de información',
      faqs: [
        { question: '¿Cómo puedo buscar una publicación específica para ver toda su información?', answer: "En 'Buscar publicación', introduce el ID de la publicación que desees buscar. <br> Puedes encontrar el valor del ID de la publicación en la tabla presente en 'Mis publicaciones'.", showAnswer: false, selected: false },
        { question: "¿Qué detalles podré encontrar en la página de 'Buscar publicación'?", answer: "Una vez realizada la búsqueda, si la publicación existe, podrás encontrar toda la información que proporcionaste al crearla. <br> Esta información incluye: ID de la publicación, fecha y hora de la última modificación, título y descripción de la publicación y tu especialidad y experiencia. ", showAnswer: false, selected: false },
      ]
    },{
      title: 'Interacción con organismos y proyectos',
      faqs: [
        { question: '¿Cómo busco información sobre un organismo en particular y sus proyectos?', answer: "En 'Buscar organismo', introduce el nombre del organismo que desees encontrar y pulsa el botón Buscar. <br> Science Hub mostrará los resultados de tu búsqueda y, si encuentra organismos, te permitirá listar todos sus proyectos y ver más información de cada uno de ellos si así lo deseas. ", showAnswer: false, selected: false },
        { question: 'Si encuentro un proyecto emocionante de un organismo, ¿cómo puedo expresar mi interés en participar?', answer: "Puedes encontrar un proyecto mediante la búsqueda de su organismo o a través de una recomendación. <br> En ambos casos, al pulsar en el botón '+ Información', podrás ver todos los detalles del proyecto y, si no estás participando en otro proyecto y el proyecto tiene plazas disponibles, podrás participar en él pulsando el botón: ¡Quiero participar!.", showAnswer: false, selected: false },
        { question: '¿Puedo retirar mi participación de un proyecto después de haberme unido?', answer: "Si, puedes retirar tu participación de un proyecto. <br> Puedes hacerlo desde 'Mi proyecto' en el Panel de usuario o accediendo al proyecto a través de 'Buscar organismo'. ", showAnswer: false, selected: false },
        
      ]
    },{
      title: 'Recomendaciones de proyectos',
      faqs: [
        { question: '¿Cómo funcionan las recomendaciones de proyectos?', answer: "Science Hub te ofrece la posibilidad de recibir recomendaciones de proyectos en los que poder participar si lo deseas. <br> Si algún proyecto resulta de tu interés, puedes conocer más detalles de él pulsando el botón '+ Información' que aparece en la tarjeta de recomendación. <br> Las recomendaciones se ofrecen según tu profesión y según el ámbito y subámbito de los proyectos publicados por los organismos. ", showAnswer: false, selected: false },
      ]
    },{
      title: 'Mi Perfil',
      faqs: [
        { question: '¿Cómo puedo revisar mi información personal y profesional?', answer: "En la parte superior derecha de la pantalla, puedes observar tu nombre.<br> Haz click en él para desplegar el Panel de usuario. <br> Entre sus opciones, puedes encontrar 'Mi Perfil', donde podrás revisar y editar tu información personal y profesional. ", showAnswer: false, selected: false },
        { question: '¿Qué información sobre mí está disponible en mi perfil?', answer: "Está disponible: tu nombre, tu ORCID de científico, tu profesión, tu email y si te encuentras (o no) participando en un proyecto.", showAnswer: false, selected: false },
        { question: '¿Puedo cambiar mi nombre de usuario y contraseña en la sección "Mi Perfil"?', answer: "Puedes editar tu nombre de científico. <br> Sin embargo, actualmente no puedes cambiar tus credecianles: email y contraseña.", showAnswer: false, selected: false },
      ]
    },
    
  ];

  sectionsOrganization: Section[] = [
    {
      title: 'Crear y gestionar proyectos',
      faqs: [
        { question: '¿Cómo puedo crear un nuevo proyecto para buscar científicos que quieran participar en él?', answer: "Puedes crearlo a rellenando el formulario presente en 'Publicar proyecto'.", showAnswer: false, selected: false },
        { question: '¿Puedo editar el contenido de un proyecto después de haberlo creado?', answer: "Sí, puedes editar el contenido. <br> En 'Mis proyectos', selecciona el botón de 'Editar' en el proyecto que quieras editar.", showAnswer: false, selected: false },
        { question: '¿Cómo elimino un proyecto que ha terminado o que se ha cancelado?', answer: "En 'Mis proyectos', selecciona el botón 'Eliminar' del proyecto que desees eliminar.", showAnswer: false, selected: false },
      ]
    },
    {
      title: 'Búsqueda y visualización de información',
      faqs: [
        { question: '¿Cómo puedo buscar un proyecto específico para ver toda su información?', answer: "En 'Buscar proyecto', introduce el ID del proyecto que desees buscar. <br> Puedes encontrar el valor del ID del proyecto en la tabla presente en 'Mis proyectos'.", showAnswer: false, selected: false },
        { question: "¿Qué detalles podré encontrar en la página de 'Buscar científico'?", answer: "Una vez realizada la búsqueda, si el científico existe, podrás encontrar toda su información. <br> Esta información incluye: ORCID del científico, su nombre, profesión, email y disponibilidad.", showAnswer: false, selected: false },
      ]
    },{
      title: 'Recomendaciones de científicos',
      faqs: [
        { question: '¿Cómo funcionan las recomendaciones de científicos?', answer: "Science Hub te ofrece la posibilidad de recibir recomendaciones de científicos que pueden participar en tus proyectos si lo deseas. <br> Si algún científico resulta de tu interés, puedes conocer más detalles de él pulsando el botón '+ Información' que aparece en la tarjeta de recomendación. <br> Las recomendaciones se ofrecen según el ámbito y subámbito del proyecto y según la profesión del científico y la especialidad de sus publicaciones.", showAnswer: false, selected: false },
      ]
    },{
      title: 'Mi Perfil',
      faqs: [
        { question: '¿Cómo puedo revisar mi información personal y profesional?', answer: "En la parte superior derecha de la pantalla, puedes observar tu nombre.<br> Haz click en él para desplegar el Panel de usuario. <br> Entre sus opciones, puedes encontrar 'Mi Perfil', donde podrás revisar y editar tu información personal y profesional. ", showAnswer: false, selected: false },
        { question: '¿Qué información sobre mí está disponible en mi perfil?', answer: "Está disponible: el nombre del organismo, su NIF/Código DIR3, su email y su localidad.", showAnswer: false, selected: false },
        { question: '¿Puedo cambiar mi nombre de usuario y contraseña en la sección "Mi Perfil"?', answer: "Puedes editar tu nombre de organismo. <br> Sin embargo, actualmente no puedes cambiar tus credecianles: email y contraseña.", showAnswer: false, selected: false },
      ]
    },
    
  ];

 


}
