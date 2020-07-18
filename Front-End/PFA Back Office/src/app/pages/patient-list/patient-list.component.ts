import { Component, OnInit } from "@angular/core";
import { PatientService } from "src/app/services/patient.service";
import { Observable } from "rxjs";
import { Patient } from "src/app/class/patient";
import { Router } from "@angular/router";
import { PatientDetailsComponent } from "../patient-details/patient-details.component";

@Component({
  selector: "app-patient-list",
  templateUrl: "./patient-list.component.html",
  styleUrls: ["./patient-list.component.css"],
})
export class PatientListComponent implements OnInit {
  //patients: Observable<Patient[]>;
  patients: any;
  date: Date;

  // pagination
  totalRecords: number;
  page: number = 1;

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.patients = this.patientService.getPatientsList();
    this.patients.subscribe((data) => (this.patients = data));
  }

  deletePatient(id: number) {
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (res) {
      this.patientService.deletePatient(id).subscribe(
        (data) => {
          console.log(data);
          this.reloadData();
        },
        (error) => console.log(error)
      );
    }
  }
  patientDetails(id: number) {
    this.router.navigate(["patient-details", id]);
  }

  updatePatient(id: number) {
    this.router.navigate(["patient-update", id]);
  }

  public getPatientByDateId() {
    let resp = this.patientService.getPatientByDate(this.date);
    resp.subscribe((data) => (this.patients = data));
  }
}
