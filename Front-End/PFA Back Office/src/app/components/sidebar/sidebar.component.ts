import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/accueil",
    title: "Accueil",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/patient-list",
    title: "Gestion patients",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  {
    path: "/medecin-list",
    title: "Gestion medecins",
    icon: "ni-single-02 text-blue",
    class: "",
  },
  {
    path: "/admin-list",
    title: "Administrateurs",
    icon: "ni-single-02 text-green",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
