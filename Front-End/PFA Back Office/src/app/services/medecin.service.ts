import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MedecinService {
  private baseUrl = "http://localhost:8081/medecins";

  constructor(private http: HttpClient) {}

  public getMedecinsList(): Observable<any> {
    return this.http.get("http://localhost:8081/medecins");
  }

  getMedecin(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createMedecin(medecin: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, medecin);
  }

  updateMedecin(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteMedecin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }

  //new
  public getMedecinByEmail(email) {
    return this.http.get("http://localhost:8081/medecinsADR/" + email);
  }

  public getMedecinByPrenom(prenom) {
    return this.http.get("http://localhost:8081/medecinsPrenom/" + prenom);
  }

  public getMedecinBySpecialite(specialite) {
    return this.http.get("http://localhost:8081/medecinsSPC/" + specialite);
  }
}
