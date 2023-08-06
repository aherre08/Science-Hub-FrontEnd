import { Component } from '@angular/core';
import { ScientistService } from '../scientist.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-suggest-projects',
  templateUrl: './suggest-projects.component.html',
  styleUrls: ['./suggest-projects.component.css']
})
export class SuggestProjectsComponent {
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
}
