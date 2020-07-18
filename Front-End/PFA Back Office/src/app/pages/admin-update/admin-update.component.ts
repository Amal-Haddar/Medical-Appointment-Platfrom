import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "../../services/token-storage.service";
import { Admin } from "src/app/class/admin";
import { AdminService } from "src/app/services/admin.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-update",
  templateUrl: "./admin-update.component.html",
  styleUrls: ["./admin-update.component.css"],
})
export class AdminUpdateComponent implements OnInit {
  id: number;
  admin: Admin;
  currentUser: any;
  roles: string[];
  showMsg: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
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

  updateAdmin() {
    this.adminService.updateAdmin(this.id, this.admin).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
    this.admin = new Admin();
    this.showMsg = true;
  }

  onSubmit() {
    if (this.token.getUser().roles[0] == ["ROLE_ADMIN"]) {
      this.updateAdmin();
    }
  }

  gotoProfile() {
    this.router.navigate(["user-profile", this.token.getUser().id]);
  }
}
