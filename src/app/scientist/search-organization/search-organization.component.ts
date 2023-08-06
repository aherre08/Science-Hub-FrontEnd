import { Component } from '@angular/core';
import { ScientistService } from '../scientist.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-search-organization',
  templateUrl: './search-organization.component.html',
  styleUrls: ['./search-organization.component.css']
})
export class SearchOrganizationComponent {
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

  buscarOrganismo(){
    
  }
}
