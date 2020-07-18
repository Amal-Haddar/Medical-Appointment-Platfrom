import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { SearchPageComponent } from "src/app/pages/search-page/search-page.component";
import { DetailsPageComponent } from "src/app/pages/details-page/details-page.component";

export const AuthLayoutRoutes: Routes = [
  { path: "search", component: SearchPageComponent },

  { path: "login", component: LoginComponent },

  { path: "register", component: RegisterComponent },
  { path: "detailsMedecin/:id", component: DetailsPageComponent },
];
