import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MedecinService {
  private baseUrl = "http://localhost:8081/medecins";

  constructor(private http: HttpClient) {}

  getMedecin(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateMedecin(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteMedecin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
}
