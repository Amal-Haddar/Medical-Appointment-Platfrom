import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: any = {};
  isLoggedIn: boolean;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      console.log("getToken() : " + this.tokenStorage.getToken());
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    } else {
      this.isLoggedIn = false;
    }
  }

  ngOnDestroy() {}

  onSubmit() {
    this.authService.login(this.form).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage(this.tokenStorage.getUser().id);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(id: number) {
    //window.location.reload();
    //this.router.navigate(["user-profile"]);
    this.router.navigate(["user-profile", id]);
  }
}
