import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from 'rxjs';
import { User } from './user';
import { catchError, tap, map } from 'rxjs/operators';
import { sha256 } from 'js-sha256';
import { ok } from 'assert';
import { ReponseActivite } from './Activite';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {


  constructor(private http: HttpClient) { }

  getAllActivities(perimetre:number, longitude: number, latitude: number, category: string, token:string): Observable<ReponseActivite> {

    const optionRequeteGetWithToken = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };

    console.log(token)
    

    return this.http.get<ReponseActivite>("http://109.11.21.53:9997/api/hobeez/google/nearby?perimetre="+perimetre+"&longitude="+longitude+"&latitude="+latitude+"&l_type_raw="+category,optionRequeteGetWithToken )
  }

  getImage(apiKey:string, photoreference:string, maxwidth:number, maxheight:number){
    // const optionRequeteGet = {
    //   responseType: 'text' as 'json',
    // }
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/place/photo?key=${apiKey}&photoreference=${photoreference}&maxwidth=${maxwidth}&maxheight=${maxheight}`)
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

