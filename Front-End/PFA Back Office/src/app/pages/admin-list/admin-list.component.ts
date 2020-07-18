import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
import { Router } from "@angular/router";
import { Admin } from "src/app/class/admin";

@Component({
  selector: "app-admin-list",
  templateUrl: "./admin-list.component.html",
  styleUrls: ["./admin-list.component.css"],
})
export class AdminListComponent implements OnInit {
  admins: any;

  // pagination
  totalRecords: number;
  page: number = 1;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.admins = this.adminService.getAdminsList();
  }
}
