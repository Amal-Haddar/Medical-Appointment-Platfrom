import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  private baseUrl = "http://localhost:8081/patients";

  constructor(private http: HttpClient) {}

  getPatient(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updatePatient(id: number, value: any): Observable<Object> {
    return this.http.patch(`${this.baseUrl}/${id}`, value);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: "text" });
  }
}
