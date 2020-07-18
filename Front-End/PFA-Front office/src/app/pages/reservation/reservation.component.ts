import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";
import { ReservationService } from "../../services/reservation.service";

import { CalendrierService } from "../../services/calendrier-service.service";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { FullCalendarComponent } from "@fullcalendar/angular";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listGrigPlugin from "@fullcalendar/list";
import { EventInput } from "@fullcalendar/core";
import { Idisponibility } from "../disponibility/disponibility";
@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
  id: number;
  currentUser: any;
  tab: any = {};
  form: any = {};
  alert: boolean = false;
  alertDispo: boolean = false;
  alertReserv: boolean = false;
  typeAlert: string;
  message: string;
  messageDispo: string;
  messageReserv: string;
  valide: boolean;
  dispo: any[];
  dispoDay: any[];
  erroMessage: string;
  calendrierId: any;
  disponibility: Idisponibility;
  constructor(
    private route: ActivatedRoute,
    private token: TokenStorageService,
    private reservationService: ReservationService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private calendrierService: CalendrierService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.id = this.route.snapshot.params["id"];
  }
  @ViewChild("calendar") calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarVisible = true;
  calendarPlugins = [
    dayGridPlugin,
    timeGrigPlugin,
    interactionPlugin,
    listGrigPlugin,
  ];
  calendarWeekends = true;
  calendarTimeZone = "UTC";
  calendarEvents: EventInput[] = [];
  afficherDispo() {
    this.closeAlertReserv();
    this.closeAlert();
    this.dispoDay = [];
    this.tab.medecinId = this.id;
    this.tab.patientId = this.currentUser.id;
    this.tab.commentaire = this.form.commentaire;
    this.tab.start = this.form.start;
    this.calendrierService
      .getCalendrierId(this.tab.medecinId)
      .subscribe((result) => {
        this.calendrierService.getDisponibility(result).subscribe((dispo) => {
          this.dispo = dispo._embedded.disponibilites;

          this.dispo.forEach((el) => {
            if (
              new Date(this.tab.start).getFullYear() ==
                this.changeDatetoUTC(el.start).getFullYear() &&
              new Date(this.tab.start).getMonth() ==
                this.changeDatetoUTC(el.start).getMonth() &&
              new Date(this.tab.start).getDay() ==
                this.changeDatetoUTC(el.start).getDay()
            ) {
              this.dispoDay.push(el);
              console.log("push");
            }
          });

          if (this.dispoDay.length !== 0) {
            console.log(this.dispoDay);
            this.messageDispo = "medecin est disponible le ";
            this.alertDispo = true;
          } else {
            this.messageDispo = "medecin n'est pas disponible le ";
            this.alertDispo = true;
          }
        });
      });
    let existe = false;
    this.reservationService
      .getReservationByMedecin(this.tab.medecinId)
      .subscribe((reservations) => {
        reservations.forEach((el) => {
          console.log(new Date(this.tab.start));
          console.log(this.changeDatetoUTC(el.start));
          if (
            new Date(this.tab.start).getTime() ===
            this.changeDatetoUTC(el.start).getTime()
          ) {
            existe = true;
          }
        });
        if (existe == true) {
          this.messageReserv =
            " a été reservé. Vous pouvez changer la date Et/ou l'heure pour réserver ";
          this.alertReserv = true;
        }
      });
  }

  onSubmit() {
    this.closeAlertDispo();
    this.closeAlertReserv();
    console.log(this.form);
    this.tab.medecinId = this.id;
    this.tab.patientId = this.currentUser.id;
    this.tab.commentaire = this.form.commentaire;
    this.tab.start = this.form.start;

    this.valide = false;
    this.calendrierService
      .getCalendrierId(this.tab.medecinId)
      .subscribe((result) => {
        console.log(result);
        this.calendrierService.getDisponibility(result).subscribe((dispo) => {
          this.dispo = dispo._embedded.disponibilites;

          this.dispo.forEach((el) => {
            if (
              new Date(this.tab.start) >= this.changeDatetoUTC(el.start) &&
              new Date(this.tab.start) <= this.changeDatetoUTC(el.end)
            ) {
              this.valide = true;
            }
          });
          let existe = false;
          this.reservationService
            .getReservationByMedecin(this.tab.medecinId)
            .subscribe((reservations) => {
              reservations.forEach((el) => {
                console.log(new Date(this.tab.start));
                console.log(this.changeDatetoUTC(el.start));
                if (
                  new Date(this.tab.start).getTime() ===
                  this.changeDatetoUTC(el.start).getTime()
                ) {
                  existe = true;
                }
              });
              if (existe == true) {
                this.valide = false;
              }
              if (this.ExisteReservation(this.tab.start)) {
                console.log("il y a une reservation dans le meme date");
              }
              if (this.valide == true) {
                console.log("valide ");
                this.reservationService
                  .createReservation(JSON.parse(JSON.stringify(this.tab)))
                  .subscribe((result) => {
                    this.typeAlert =
                      "alert alert-success alert-dismissible fade show";
                    this.message = "Votre réservation est envoyée avec succès.";
                    this.alertDispo = false;
                    this.alert = true;

                    this.form = {};
                  });
              } else {
                console.log("invalide");
                if (existe == true) {
                  this.typeAlert =
                    "alert alert-danger alert-dismissible fade show";
                  this.message =
                    "Cette date/heure a été reservé(e) par un patient.";
                  this.alert = true;
                } else {
                  this.typeAlert =
                    "alert alert-danger alert-dismissible fade show";
                  this.message =
                    "Le medecin n'est pas disponible pour cette date ou Heure.";
                  this.alert = true;
                }
              }
            });
        });
      });
  }
  closeAlert() {
    this.alert = false;
  }
  closeAlertDispo() {
    this.alertDispo = false;
  }
  closeAlertReserv() {
    this.alertReserv = false;
  }
  changeDatetoUTC(d) {
    const now = new Date(d);
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  }

  open(content) {
    this.calendrierService.getCalendrierId(this.id).subscribe({
      next: (calendrierId) => {
        console.log(calendrierId);
        if (calendrierId) {
          this.calendrierService.getDisponibility(calendrierId).subscribe({
            next: (disponibility) => {
              this.disponibility = disponibility;

              this.calendarEvents = this.disponibility._embedded.disponibilites;
            },
            error: (err) => (this.erroMessage = err),
          });
        }
      },
      error: (err) => (this.erroMessage = err),
    });
    this.modalService.open(content, { size: "lg" });
  }

  ExisteReservation(start) {
    let existe = false;
    this.reservationService
      .getReservationByMedecin(this.tab.medecinId)
      .subscribe((reservations) => {
        reservations.forEach((el) => {
          console.log(new Date(start));
          console.log(this.changeDatetoUTC(el.start));
          if (
            new Date(start).getTime() ===
            this.changeDatetoUTC(el.start).getTime()
          ) {
            existe = true;
          }
        });
      });
    console.log(existe);
    return existe;
  }
}
