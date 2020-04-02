import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { catchError, tap, map } from 'rxjs/operators';
import { sha256 } from 'js-sha256';
import { ok } from 'assert';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  //recup une seule observable activité 
  getUser(email: string): Observable<User> {
    return this.http.get<User>("http://109.11.21.53:9996/api/user/" + email, optionRequete).pipe(
      tap(data => null),
      catchError(this.handleError)
    )
  }

  login(email): Observable<User> {
   return this.http.get<User>(`http://109.11.21.53:9996/api/user/${email}`, optionRequete)
  }

  addUser(email, fullName, password): Observable<Object> {
    let hash = sha256.create();
    hash.update(password);
    hash.hex();
    let pass = hash.toString()
    return this.http.post<User>(`http://109.11.21.53:9996/api/user/add?email=${email}&fullname=${fullName}&password=${pass}`, {}, optionRequetePost)
  }

  getCoupons(): Observable<User[]> {
    return this.http.get<User[]>(API, optionRequete).pipe(
      tap(data => null),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
const API = "http://109.11.21.53:9996/api/user/all";
const x = btoa("DR567Kle_i:2Kjl9-(kl")
const optionRequete = {
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + x


  })
};

const optionRequetePost = {
  responseType: 'text' as 'json',
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + x
  })
};