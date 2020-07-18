import { Component, OnInit } from "@angular/core";
import { Patient } from "src/app/class/patient";
import { PatientService } from "src/app/services/patient.service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-patient-create",
  templateUrl: "./patient-create.component.html",
  styleUrls: ["./patient-create.component.css"],
})
export class PatientCreateComponent implements OnInit {
  patient: Patient = new Patient();
  submitted = false;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";

  constructor(
    private patientService: PatientService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  newPatient(): void {
    this.submitted = false;
    this.patient = new Patient();
  }

  save() {
    this.patientService.createPatient(this.patient).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.patient = new Patient();
    this.gotoList();
  }

  onSubmit() {
    //this.submitted = true;
    //this.save();
    this.form.role = ["patient"];
    this.authService.register(this.form).subscribe(
      (data) => {
        console.log(data);
        console.log(this.form);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  gotoList() {
    this.router.navigate(["/patient-list"]);
  }

  list() {
    this.router.navigate(["patient-list"]);
  }
}
