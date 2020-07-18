import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Observable } from "rxjs";
import { User } from "src/app/class/user";
import { Router } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";
@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"],
})
export class SearchPageComponent implements OnInit {
  employees: Observable<User[]>;
  medecins: any;
  users: any;
  currentUser: any;
  //email: string;
  prenom: string;
  //specialite: string;
  np: string;

  // pagination
  totalRecords: number;
  page: number = 1;

  email = null;
  specialite = null;

  constructor(
    private service: UserService,
    private router: Router,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
    let resp = this.service.getUsers();
    resp.subscribe((data) => (this.users = data));
  }

  public findUserByEmailId() {
    let resp = this.service.getUserByEmail(this.email);
    resp.subscribe((data) => (this.users = data));
  }
  public findUserByPrenomId() {
    let resp = this.service.getUserByPrenom(this.prenom);
    resp.subscribe((data) => (this.users = data));
  }

  public findUserBySpecialiteId() {
    let resp = this.service.getUserBySpecialite(this.specialite);
    resp.subscribe((data) => (this.users = data));
  }

  // recherche par nom et prenom njareb fyha
  public findUserByNomOrPrenomId() {
    let resp = this.service.getUserByNomOrPrenom(this.prenom);
    resp.subscribe((data) => (this.users = data));
  }

  userDetails(id: number) {
    console.log("current user: " + this.currentUser);
    if (this.currentUser == null) {
      this.router.navigate(["detailsMedecin", id]);
    } else {
      this.router.navigate(["details-Medecin", id]);
    }
  }

  public reloadData() {
    this.users = this.service.getUsers();
    this.users.subscribe((data) => (this.users = data));
  }
}
