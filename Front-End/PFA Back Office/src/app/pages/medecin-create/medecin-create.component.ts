import { Component, OnInit } from "@angular/core";
import { Medecin } from "src/app/class/medecin";
import { MedecinService } from "src/app/services/medecin.service";
import { Router } from "@angular/router";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-medecin-create",
  templateUrl: "./medecin-create.component.html",
  styleUrls: ["./medecin-create.component.css"],
})
export class MedecinCreateComponent implements OnInit {
  medecin: Medecin = new Medecin();
  submitted = false;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";

  constructor(
    private medecinService: MedecinService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  url = "/assets/avatar.jpg";

  /*   sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  } */

  onselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(e.target.files[0]);
      };
    }
  }

  newMedecin(): void {
    this.submitted = false;
    this.medecin = new Medecin();
  }

  save() {
    this.medecinService.createMedecin(this.medecin).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.medecin = new Medecin();
    this.gotoList();
  }

  onSubmit() {
    /* this.submitted = true;
    this.save(); */
    this.form.role = ["medecin"];
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
    this.router.navigate(["/medecin-list"]);
  }

  list() {
    this.router.navigate(["medecin-list"]);
  }
}
