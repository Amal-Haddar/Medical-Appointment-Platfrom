import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export let ROUTES: RouteInfo[] = [];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  currentUser: any;

  constructor(private router: Router, private token: TokenStorageService) {}

  ngOnInit() {
    this.currentUser = this.token.getUser();
    if (this.currentUser.roles[0] == "ROLE_MEDECIN") {
      ROUTES = [
        {
          path: "/accueil",
          title: "Accueil",
          icon: "ni-tv-2 text-yellow",
          class: "",
        },

        {
          path: "/disponibility",
          title: "Disponibility",
          icon: "ni-time-alarm text-primary",
          class: "",
        },
        {
          path: "/rendez-vous",
          title: "Mes rendez-vous",
          icon: "fas fa-calendar  text-success",
          class: "",
        },
      ];
    }
    if (this.currentUser.roles[0] == "ROLE_PATIENT") {
      ROUTES = [
        {
          path: "/accueil",
          title: "Accueil",
          icon: "ni-tv-2 text-yellow",
          class: "",
        },

        {
          path: "/recherche",
          title: "Chercher un Médecin",
          icon: "fas fa-search text-primary",
          class: "",
        },
        {
          path: "/mes-reservations",
          title: "Mes Reservations",
          icon: "fas fa-calendar  text-success",
          class: "",
        },
      ];
    }

    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
