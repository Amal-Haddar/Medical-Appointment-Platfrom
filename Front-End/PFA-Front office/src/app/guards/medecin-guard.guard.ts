import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class MedecinGuardGuard implements CanActivate {
  currentUser: any;
  constructor(private token: TokenStorageService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.currentUser = this.token.getUser();
    if (
      this.currentUser == null ||
      this.currentUser.roles[0] != "ROLE_MEDECIN"
    ) {
      return false;
    }
    return true;
  }
}
