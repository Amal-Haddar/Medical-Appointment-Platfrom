import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API = "http://localhost:8081/api/auth/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(
      AUTH_API + "signin",
      {
        username: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(user): Observable<any> {
    return this.http.post(
      AUTH_API + "signup",
      {
        username: user.username,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        password: user.password,
        role: user.role,
        adresse: user.adresse,
        specialite: user.specialite,
        cin: user.cin,
        tel: user.tel,
        date_naissance: user.date_naissance,
        prixVisite: user.prixVisite,
      },
      httpOptions
    );
  }
}
