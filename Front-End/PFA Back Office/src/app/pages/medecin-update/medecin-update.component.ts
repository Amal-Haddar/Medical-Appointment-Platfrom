import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Medecin } from "src/app/class/medecin";
import { MedecinService } from "src/app/services/medecin.service";

@Component({
  selector: "app-medecin-update",
  templateUrl: "./medecin-update.component.html",
  styleUrls: ["./medecin-update.component.css"],
})
export class MedecinUpdateComponent implements OnInit {
  id: number;
  medecin: Medecin;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  showMsg: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medecinService: MedecinService
  ) {}

  ngOnInit(): void {
    this.medecin = new Medecin();

    this.id = this.route.snapshot.params["id"];

    this.medecinService.getMedecin(this.id).subscribe(
      (data) => {
        console.log(data);
        this.medecin = data;
      },
      (error) => console.log(error)
    );
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

  onSubmit() {
    this.updateMedecin();
  }

  gotoList() {
    this.router.navigate(["/medecin-list"]);
  }

  list() {
    this.router.navigate(["medecin-list"]);
  }
}
