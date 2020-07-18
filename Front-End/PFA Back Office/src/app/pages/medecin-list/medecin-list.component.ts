import { Component, OnInit } from "@angular/core";
import { MedecinService } from "src/app/services/medecin.service";
import { Observable } from "rxjs";
import { Medecin } from "src/app/class/medecin";
import { Router } from "@angular/router";
import { MedecinDetailsComponent } from "../medecin-details/medecin-details.component";
import { User } from "src/app/class/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-medecin-list",
  templateUrl: "./medecin-list.component.html",
  styleUrls: ["./medecin-list.component.css"],
})
export class MedecinListComponent implements OnInit {
  medecins: any;
  users: any;
  // pagination
  totalRecords: number;
  page: number = 1;

  email = null;
  specialite = null;
  prenom: string;
  np: string;

  constructor(
    private medecinService: MedecinService,
    private router: Router,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.medecins = this.medecinService.getMedecinsList();
    this.medecins.subscribe((data) => (this.medecins = data));
  }

  deleteMedecin(id: number) {
    var res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if (res) {
      this.medecinService.deleteMedecin(id).subscribe(
        (data) => {
          console.log(data);
          this.reloadData();
        },
        (error) => console.log(error)
      );
    }
  }
  medecinDetails(id: number) {
    this.router.navigate(["medecin-details", id]);
  }

  updateMedecin(id: number) {
    this.router.navigate(["medecin-update", id]);
  }

  public getMedecinByEmailId() {
    let resp = this.medecinService.getMedecinByEmail(this.email);
    resp.subscribe((data) => (this.medecins = data));
  }
  public findMedecinByPrenomId() {
    let resp = this.medecinService.getMedecinByPrenom(this.prenom);
    resp.subscribe((data) => (this.medecins = data));
  }

  public findMedecinBySpecialiteId() {
    let resp = this.medecinService.getMedecinBySpecialite(this.specialite);
    resp.subscribe((data) => (this.medecins = data));
  }

  // recherche par nom et prenom njareb fyha
  public findUserByNomOrPrenomId() {
    let resp = this.service.getUserByNomOrPrenom();
    resp.subscribe(
      (data) => ((this.users.nom = data), (this.users.prenom = data))
    );
  }
}
