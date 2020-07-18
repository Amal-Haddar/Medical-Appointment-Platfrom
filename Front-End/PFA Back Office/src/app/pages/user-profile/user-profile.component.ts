import { Component, OnInit } from "@angular/core";
import { Patient } from "src/app/class/patient";
import { Admin } from "src/app/class/admin";
import { User } from "src/app/class/user";
import { PatientService } from "src/app/services/patient.service";
import { AdminService } from "src/app/services/admin.service";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { TokenStorageService } from "../../services/token-storage.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  id: number;
  admin: Admin;
  patient: Patient;
  user: User;
  currentUser: any;
  roles: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private token: TokenStorageService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.roles = this.token.getUser().roles;
    this.user = new User();

    if (this.token.getUser().roles[0] == ["ROLE_ADMIN"]) {
      this.admin = new Admin();
      this.id = this.route.snapshot.params["id"];

      this.adminService.getAdmin(this.id).subscribe(
        (data) => {
          console.log(data);
          this.admin = data;
        },
        (error) => console.log(error)
      );
    }
  }

  deleteAdmin(id: number) {
    var res = confirm(
      "Êtes-vous sûr de vouloir désactiver votre compte ADMIN ?"
    );
    if (res) {
      this.adminService.deleteAdmin(id).subscribe(
        (data) => {
          console.log(data);
          this.logout();
        },
        (error) => console.log(error)
      );
    }
  }

  reloadData() {
    this.router.navigate(["register"]);
  }

  updateAdmin(id: number) {
    this.router.navigate(["admin-update", id]);
  }

  logout() {
    var res = confirm("Nous nous excusons pour la gêne occasionnée");
    if (res) {
      this.token.signOut();
      this.router.navigate(["register"]);
    }
  }
}
