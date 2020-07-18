import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Idisponibility } from "../pages/disponibility/disponibility";

@Injectable({
  providedIn: "root",
})
export class CalendrierService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private clandrierUrl = "http://localhost:8083/calendriers/";
  constructor(private http: HttpClient) {}
  getCalendrierId(id): any {
    return this.http.get(this.clandrierUrl + id, { responseType: "text" }).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getDisponibility(id): any {
    console.log(id);
    return this.http
      .get<Idisponibility[]>(this.clandrierUrl + id + "/disponibilites")
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  createCalenar(id, dispo): Observable<any> {
    return this.http.patch(this.clandrierUrl + id, dispo, this.httpOptions);
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured : ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status},error message is : ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
