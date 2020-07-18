import { Component, OnInit, ViewChild } from "@angular/core";
import { ReservationService } from "../../services/reservation.service";
import { UserService } from "../../services/user.service";

import { TokenStorageService } from "../../services/token-storage.service";

import { FullCalendarComponent } from "@fullcalendar/angular";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listGrigPlugin from "@fullcalendar/list";
import { EventInput } from "@fullcalendar/core";

@Component({
  selector: "app-all-reservations-medecin",
  templateUrl: "./all-reservations-medecin.component.html",
  styleUrls: ["./all-reservations-medecin.component.css"],
})
export class AllReservationsMedecinComponent implements OnInit {
  currentUser: any;
  clickedEvent: any;
  reservations: any;
  patient: any = {};
  erroMessage: string;
  form: any = {};
  eventClickId: any;
  alert: boolean = false;
  operation: any;

  constructor(
    private token: TokenStorageService,
    private reservationService: ReservationService,
    private userService: UserService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("id medecin: " + this.currentUser.id);
    this.reservationService
      .getReservationByMedecin(this.currentUser.id)
      .subscribe({
        next: (reservations) => {
          this.reservations = reservations;
          this.calendarEvents = this.reservations;
        },
        error: (err) => (this.erroMessage = err),
      });
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
  calendrierId: any;
  EventClick(arg, content) {
    this.eventClickId = arg.event.id;

    this.form.start = new Date(arg.event.start).toISOString().slice(0, 16);
    this.clickedEvent = this.calendarEvents.filter(
      (event) => event.id == arg.event.id
    );
    console.log("patientId: " + this.clickedEvent[0].patientId);
    this.userService.getPatient(this.clickedEvent[0].patientId).subscribe({
      next: (patient) => {
        this.patient = patient;
        console.log(this.patient);
      },
      error: (err) => (this.erroMessage = err),
    });
    this.openModify(content);
  }
  openModify(content) {
    this.modalService.open(content);
  }
  onModify() {
    if (confirm("Voulez vous vraiment modifier votre réservation ?")) {
      this.reservationService
        .patchReservation({
          id: this.clickedEvent[0].id,
          medecinId: this.clickedEvent[0].medecinId,
          patientId: this.clickedEvent[0].patientId,
          commentaire: this.clickedEvent[0].commentaire,
          start: this.form.start,
        })
        .subscribe({
          next: (reservations) => {
            this.operation = "modifié";
            this.alert = true;
          },
          error: (err) => (this.erroMessage = err),
        });
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }
  onDelete() {
    if (confirm("Voulez vous vraiment annuler votre réservation ?")) {
      this.reservationService
        .deleteReservation(this.clickedEvent[0].id)
        .subscribe({
          next: (reservations) => {
            this.operation = "annulée";
            this.alert = true;
          },
          error: (err) => (this.erroMessage = err),
        });
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }
  closeAlert() {
    this.alert = false;
  }
}
