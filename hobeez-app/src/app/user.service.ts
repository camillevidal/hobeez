import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from 'rxjs';
import { User } from './User';
import { catchError, tap, map } from 'rxjs/operators';
import { sha256 } from 'js-sha256';
import { ok } from 'assert';
import { Token } from './Token';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  //recup une seule observable activité 
  getToken(email: string, mdp: string): Observable<string> {
    console.log("---------SERVICE TOKEN-----------------")
    console.log(email)

    let hash = sha256.create();
    hash.update(mdp);
    hash.hex();
    let pass = hash.toString()
    console.log(pass)
    return this.http.post<string>(`
      http://109.11.21.53:9997/authenticate`, {
      "username": email,
      "password": pass
    }, optionRequetePost)
  }


  //recup une seule observable activité 
  //   getUser(email: string): Observable<User> {
  //     return this.http.get<User>("http://109.11.21.53:9997/api/user/" + email, optionRequete).pipe(
  //       tap(data => null),
  //       catchError(this.handleError)
  //     )
  //   }

  login(email, mdp, token): Observable<User> {
    console.log(email)
    console.log(mdp)
    
    return this.http.get<User>(`http://109.11.21.53:9997/api/hobeez/user/${email}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`

      })})
  }

  //   addUser(email, fullName, password): Observable<Object> {
  //     let hash = sha256.create();
  //     hash.update(password);
  //     hash.hex();
  //     let pass = hash.toString()
  //return this.http.post<User>(`http://109.11.21.53:9997/api/user/add?email=${email}&fullname=${fullName}&password=${pass}`, {}, optionRequetePost)
  //   }

  //   getCoupons(): Observable<User[]> {
  //     return this.http.get<User[]>(API, optionRequete).pipe(
  //       tap(data => null),
  //       catchError(this.handleError)
  //     );
  //   }
  //   private handleError(err: HttpErrorResponse) {

  //     let errorMessage = '';
  //     if (err.error instanceof ErrorEvent) {

  //       errorMessage = `An error occurred: ${err.error.message}`;
  //     } else {

  //       errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  //     }
  //     console.error(errorMessage);
  //     return throwError(errorMessage);
  //   }
  // }
  // const API = "http://109.11.21.53:9997/api/user/all";



};
const x = btoa("DR567Kle_i:2Kjl9-(kl")
const optionRequetePost = {
  responseType: 'text' as 'json',
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + x
  })
};
const optionRequete = {
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + x


  })
};

