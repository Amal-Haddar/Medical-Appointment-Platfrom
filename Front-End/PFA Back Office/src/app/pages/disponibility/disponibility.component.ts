import { Component, OnInit, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CalendrierService } from "../../services/calendrier-service.service";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listGrigPlugin from "@fullcalendar/list";
import { Idisponibility } from "./disponibility";
import { element } from "protractor";
import { Location } from "@angular/common";
import { TokenStorageService } from "../../services/token-storage.service";
@Component({
  selector: "app-disponibility",
  templateUrl: "./disponibility.component.html",
  styleUrls: ["./disponibility.component.css"],
  providers: [NgbModalConfig, NgbModal],
})
export class DisponibilityComponent implements OnInit {
  currentUser: any;
  form: any = {};
  typeBtn = "";
  tab = [];
  eventClickId: any;
  @ViewChild("calendar") calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarVisible = true;
  calendarPlugins = [
    dayGridPlugin,
    timeGrigPlugin,
    interactionPlugin,
    listGrigPlugin,
  ];
  calendarWeekends = true;
  calendarEvents: EventInput[] = []; /*[
    {
      title: "Event Now",
      //start: '2020-05-02T08:00:00',
      //end: '2020-05-02T10:30:00',
      start: new Date(),
      end: new Date(),
    },
  ];*/
  erroMessage: string;
  calendrierId: any;
  disponibility: Idisponibility;
  constructor(
    private token: TokenStorageService,
    private location: Location,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private CalendrierService: CalendrierService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("User: " + JSON.stringify(this.currentUser));
    this.form.start = "";
    this.form.end = "";
    this.CalendrierService.getCalendrierId(this.currentUser.id).subscribe({
      next: (calendrierId) => {
        if (calendrierId) {
          this.CalendrierService.getDisponibility(calendrierId).subscribe({
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
  }

  handleDateClick(arg) {
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.calendarEvents.push({
        // add new event data. must create new array
        title: "Work time",
        start: arg.date,
        end: arg.date,
      });
      this.calendarEvents.forEach((event) =>
        this.tab.push({
          title: event.title,
          start: event.start,
          end: event.end,
        })
      );
      this.CalendrierService.createCalenar(
        this.currentUser.id,
        JSON.parse(JSON.stringify(this.tab))
      ).subscribe((result) => console.log(result));
      console.log("calendarEvents: " + JSON.stringify(this.calendarEvents));
    }
  }
  EventClick(arg, content) {
    this.eventClickId = arg.event.id;

    console.log(this.calendarEvents);
    this.form.start = new Date(arg.event.start).toISOString().slice(0, 16);
    this.form.end = new Date(arg.event.end).toISOString().slice(0, 16);
    this.openModify(content);
  }
  open(content) {
    this.typeBtn = "submit";
    this.modalService.open(content);
  }
  openModify(content) {
    this.typeBtn = "modify";
    this.modalService.open(content);
  }
  onDelete() {
    this.typeBtn = "delete";
  }
  onSubmit() {
    console.log("id user :" + this.currentUser.id);
    console.log(this.typeBtn);
    if (this.typeBtn == "modify" || this.typeBtn == "delete") {
      this.calendarEvents = this.calendarEvents.filter(
        (obj) => obj.id != this.eventClickId
      );
    }
    if (this.typeBtn == "modify" || this.typeBtn == "submit") {
      this.calendarEvents.push({
        // add new event data. must create new array
        title: "Work time",
        start: this.form.start,
        end: this.form.end,
      });
    }
    this.calendarEvents.forEach((event) =>
      this.tab.push({
        title: event.title,
        start: event.start,
        end: event.end,
      })
    );

    this.CalendrierService.createCalenar(
      this.currentUser.id,
      JSON.parse(JSON.stringify(this.tab))
    ).subscribe((result) => console.log(result));
    console.log("calendarEvents: " + JSON.stringify(this.calendarEvents));
    location.reload();
  }
}
