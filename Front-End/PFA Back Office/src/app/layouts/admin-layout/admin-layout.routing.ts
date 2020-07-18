import { Routes } from "@angular/router";

import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { SearchPageComponent } from "src/app/pages/search-page/search-page.component";
import { HomeComponent } from "src/app/pages/home/home.component";
import { ProfileComponent } from "src/app/pages/profile/profile.component";
import { BoardUserComponent } from "src/app/pages/board-user/board-user.component";
import { BoardModeratorComponent } from "src/app/pages/board-moderator/board-moderator.component";
import { BoardAdminComponent } from "src/app/pages/board-admin/board-admin.component";
import { PatientListComponent } from "src/app/pages/patient-list/patient-list.component";
import { AdminListComponent } from "src/app/pages/admin-list/admin-list.component";
import { PatientCreateComponent } from "src/app/pages/patient-create/patient-create.component";
import { PatientDetailsComponent } from "src/app/pages/patient-details/patient-details.component";
import { PatientUpdateComponent } from "src/app/pages/patient-update/patient-update.component";
import { MedecinListComponent } from "src/app/pages/medecin-list/medecin-list.component";
import { MedecinDetailsComponent } from "src/app/pages/medecin-details/medecin-details.component";
import { MedecinUpdateComponent } from "src/app/pages/medecin-update/medecin-update.component";
import { MedecinCreateComponent } from "src/app/pages/medecin-create/medecin-create.component";
import { AccueilComponent } from "src/app/pages/accueil/accueil.component";
import { AdminUpdateComponent } from "src/app/pages/admin-update/admin-update.component";
import { AdminGuardGuard } from "src/app/guards/admin-guard.guard";

export const AdminLayoutRoutes: Routes = [
  {
    path: "user-profile/:id",
    component: UserProfileComponent,
    //canActivate: [AdminGuardGuard],
  },

  {
    path: "home",
    component: HomeComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "profile",
    component: ProfileComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "user",
    component: BoardUserComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "mod",
    component: BoardModeratorComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "admin",
    component: BoardAdminComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "patient-list",
    component: PatientListComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "patient-create",
    component: PatientCreateComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "patient-details/:id",
    component: PatientDetailsComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "patient-update/:id",
    component: PatientUpdateComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "medecin-list",
    component: MedecinListComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "admin-list",
    component: AdminListComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "medecin-create",
    component: MedecinCreateComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "medecin-details/:id",
    component: MedecinDetailsComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "medecin-update/:id",
    component: MedecinUpdateComponent,
    //canActivate: [AdminGuardGuard],
  },
  {
    path: "accueil",
    component: AccueilComponent,
    // canActivate: [AdminGuardGuard],
  },
  {
    path: "admin-update/:id",
    component: AdminUpdateComponent,
    //canActivate: [AdminGuardGuard],
  },
];
