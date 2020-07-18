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
import { ReservationComponent } from "./pages/reservation/reservation.component";
import { AllReservationsComponent } from "./pages/all-reservations/all-reservations.component";
import { MedecinGuardGuard } from "./guards/medecin-guard.guard";
import { PatientGuardGuard } from "./guards/patient-guard.guard";
import { AllReservationsMedecinComponent } from "./pages/all-reservations-medecin/all-reservations-medecin.component";
import { UserUpdateComponent } from './pages/user-update/user-update.component';
import { AccueilComponent } from './pages/accueil/accueil.component';

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
    ReservationComponent,
    AllReservationsComponent,
    AllReservationsMedecinComponent,
    UserUpdateComponent,
    AccueilComponent,
  ],
  providers: [
    UserService,
    authInterceptorProviders,
    MedecinGuardGuard,
    PatientGuardGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
