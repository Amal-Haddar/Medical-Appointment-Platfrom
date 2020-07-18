import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";
import { Medecin } from "src/app/class/medecin";
import { MedecinService } from "src/app/services/medecin.service";
import { Patient } from "src/app/class/patient";
import { PatientService } from "src/app/services/patient.service";
import { AgmCoreModule } from "@agm/core";

@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"],
})
export class UserUpdateComponent implements OnInit {
  id: number;
  medecin: Medecin;
  patient: Patient;
  currentUser: any;
  roles: string[];
  showMsg: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medecinService: MedecinService,
    private patientService: PatientService,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.token.getUser().roles[0] == ["ROLE_MEDECIN"]) {
      this.medecin = new Medecin();

      this.id = this.route.snapshot.params["id"];

      this.medecinService.getMedecin(this.id).subscribe(
        (data) => {
          console.log(data);
          this.medecin = data;
        },
        (error) => console.log(error)
      );
    } else {
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
  }

  updateMedecin() {
    this.medecinService.updateMedecin(this.id, this.medecin).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
    this.medecin = new Medecin();
    this.showMsg = true;
    //this.gotoList();
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
    if (this.token.getUser().roles[0] == ["ROLE_MEDECIN"]) {
      this.updateMedecin();
    } else {
      this.updatePatient();
    }
  }

  gotoProfile() {
    this.router.navigate(["user-profile", this.token.getUser().id]);
  }
}
