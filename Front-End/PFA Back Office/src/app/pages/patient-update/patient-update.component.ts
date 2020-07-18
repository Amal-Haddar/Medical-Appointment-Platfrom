import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Patient } from "src/app/class/patient";
import { PatientService } from "src/app/services/patient.service";

@Component({
  selector: "app-patient-update",
  templateUrl: "./patient-update.component.html",
  styleUrls: ["./patient-update.component.css"],
})
export class PatientUpdateComponent implements OnInit {
  id: number;
  patient: Patient;
  showMsg: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patient = new Patient();

    this.id = this.route.snapshot.params["id"];

    this.patientService.getPatient(this.id).subscribe(
      (data) => {
        console.log(data);
        this.patient = data;
      },
      (error) => console.log(error)
    );
  }

  updatePatient() {
    this.patientService.updatePatient(this.id, this.patient).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.patient = new Patient();
    this.showMsg = true;
    //this.gotoList();
  }

  onSubmit() {
    this.updatePatient();
  }

  gotoList() {
    this.router.navigate(["/patient-list"]);
  }

  list() {
    this.router.navigate(["patient-list"]);
  }
}
