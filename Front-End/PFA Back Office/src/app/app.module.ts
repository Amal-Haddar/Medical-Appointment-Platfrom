import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { AgmCoreModule } from "@agm/core";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { UserService } from "./services/user.service";
import { DetailsPageComponent } from "./pages/details-page/details-page.component";
import { HomeComponent } from "./pages/home/home.component";
import { BoardAdminComponent } from "./pages/board-admin/board-admin.component";
import { BoardUserComponent } from "./pages/board-user/board-user.component";
import { BoardModeratorComponent } from "./pages/board-moderator/board-moderator.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { authInterceptorProviders } from "./_helpers/auth.interceptor";
import { DisponibilityComponent } from "./pages/disponibility/disponibility.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { PatientDetailsComponent } from "./pages/patient-details/patient-details.component";
import { PatientListComponent } from "./pages/patient-list/patient-list.component";
import { PatientUpdateComponent } from "./pages/patient-update/patient-update.component";
import { MedecinListComponent } from "./pages/medecin-list/medecin-list.component";
import { MedecinDetailsComponent } from "./pages/medecin-details/medecin-details.component";
import { MedecinUpdateComponent } from "./pages/medecin-update/medecin-update.component";
import { MedecinCreateComponent } from './pages/medecin-create/medecin-create.component';
import { PatientCreateComponent } from './pages/patient-create/patient-create.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AdminUpdateComponent } from './pages/admin-update/admin-update.component';
import { AdminListComponent } from './pages/admin-list/admin-list.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    FullCalendarModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCPYPAdmh2FmolMQymdmwRrzfCN02iD_os",
    }),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    SearchPageComponent,
    DetailsPageComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    ProfileComponent,
    DisponibilityComponent,
    PatientDetailsComponent,
    PatientListComponent,
    PatientUpdateComponent,
    MedecinListComponent,
    MedecinDetailsComponent,
    MedecinUpdateComponent,
    MedecinCreateComponent,
    PatientCreateComponent,
    AccueilComponent,
    AdminUpdateComponent,
    AdminListComponent,
  ],
  providers: [UserService, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
