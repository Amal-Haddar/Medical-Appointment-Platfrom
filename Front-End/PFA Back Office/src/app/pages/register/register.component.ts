import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.form.adresse = null;
    this.form.specialite = null;
  }

  onSubmit() {
    this.form.role = ["admin"];
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
}
