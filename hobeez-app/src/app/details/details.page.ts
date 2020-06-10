import { Component, OnInit } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';
import { Geolocation } from '@ionic-native/geolocation';
import { ActionSheetController, Platform, AlertController } from '@ionic/angular';
import {
  LatLng,
  CircleOptions,
  Circle,
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { DetailsService } from './../details.service'
import { HttpClient } from '@angular/common/http';

declare var Google: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  markers = [];
  // geocoder = new Google.maps.Geocoder;

  map: GoogleMap;
  detailsService: DetailsService;
  // base 64 decode
  information = { "html_attributions": [], "result": { "address_components": [{ "long_name": "52", "short_name": "52", "types": ["street_number"] }, { "long_name": "Allée du Levant", "short_name": "Allée du Levant", "types": ["route"] }, { "long_name": "La Grande-Motte", "short_name": "La Grande-Motte", "types": ["locality", "political"] }, { "long_name": "Hérault", "short_name": "Hérault", "types": ["administrative_area_level_2", "political"] }, { "long_name": "Occitanie", "short_name": "Occitanie", "types": ["administrative_area_level_1", "political"] }, { "long_name": "France", "short_name": "FR", "types": ["country", "political"] }, { "long_name": "34280", "short_name": "34280", "types": ["postal_code"] }], "adr_address": "\u003cspan class=\"street-address\"\u003e52 Allée du Levant\u003c/span\u003e, \u003cspan class=\"postal-code\"\u003e34280\u003c/span\u003e \u003cspan class=\"locality\"\u003eLa Grande-Motte\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eFrance\u003c/span\u003e", "formatted_address": "52 Allée du Levant, 34280 La Grande-Motte, France", "formatted_phone_number": "04 67 29 93 00", "geometry": { "location": { "lat": 43.5552826, "lng": 4.099411 }, "viewport": { "northeast": { "lat": 43.55671643029149, "lng": 4.100698080291503 }, "southwest": { "lat": 43.5540184697085, "lng": 4.098000119708498 } } }, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png", "name": "La Plage Art & Émotions", "opening_hours": { "open_now": true, "periods": [{ "open": { "day": 0, "time": "0000" } }], "weekday_text": ["Monday: Open 24 hours", "Tuesday: Open 24 hours", "Wednesday: Open 24 hours", "Thursday: Open 24 hours", "Friday: Open 24 hours", "Saturday: Open 24 hours", "Sunday: Open 24 hours"] }, "plus_code": { "compound_code": "H34X+4Q La Grande-Motte, France", "global_code": "8FM6H34X+4Q" }, "rating": 4.3, "types": ["lodging", "bar", "restaurant", "food", "health", "point_of_interest", "establishment"], "website": "http://www.laplage-artetemotions.com/" }, "status": "OK" }

  constructor(public alertController: AlertController, public actionCtrl: ActionSheetController, private ds: DetailsService, private platform: Platform) {
    this.loadMap();
    this.detailsService = ds
    
    // this.placeMarker();
  }
  

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAJGFKkkmz3kSekRLtX5TCVtV9mUYRuWgs',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAJGFKkkmz3kSekRLtX5TCVtV9mUYRuWgs'
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: this.information.result.geometry.location.lat,  // 43.610769, /////////////////
          lng: this.information.result.geometry.location.lng //3.876716 //////////////////
        },
        zoom: 17,
        tilt: 30
      }
    });
    console.log('location : ' + this.information.result.geometry.location)
    
  }

  loadToken(){
    // A ENLEVER EN VERSION FINALE
    localStorage.setItem("login", "romain@mail.com")
    localStorage.setItem("mdp", "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8")
    ///

    // Si le token n'est pas présent dans le local storage le setter 
    if(localStorage.getItem("jwt_token") == null || localStorage.getItem("jwt_token") == undefined || !localStorage.getItem("jwt_token") ||localStorage.getItem("jwt_token" ) == "undefined" || localStorage.getItem("jwt_token") == "null"){

      this.detailsService.getToken(localStorage.getItem("login"), localStorage.getItem("mdp")).subscribe(value => {
        console.log("value ", JSON.parse(value));
        localStorage.setItem("jwt_token",JSON.parse(value).token)
        return
      })
      // localStorage.setItem("jwt_token", this.detailsService.getToken(localStorage.getItem("login"), localStorage.getItem("mdp")))
    }
    else{
      let token = localStorage.getItem("jwt_token")
      var tab_token = token.split(".")
      console.log(tab_token)
      token = tab_token[1]
      console.log(token)
      let token_decrypt = atob(token) // decrypter le token 
      console.log("ATOB")
      console.log(token_decrypt)
      let json_token_decrypt = JSON.parse(token_decrypt)
      console.log(json_token_decrypt)
      let date_exp_number = json_token_decrypt.exp
      var date_exp = new Date(date_exp_number*1000);

      var now = new Date()

      if(now > date_exp){
        localStorage.setItem("jwt_token", undefined)
        this.loadToken()
      }
      else{
        console.log(date_exp)
        return
      }

    }
    
  }

  // rating = 'style = "width=50%"'

  ngOnInit() {
    this.loadToken();
    // console.log(this.information.hasOwnProperty("result"));
    // console.log(this.information["result"])
    let rating = (this.information["result"]["rating"] * 100) / 5
    let note = String(rating) + "%"
    document.getElementById("ratingSpan").style.width = note
  }


  placeMarker() {
    console.log("marqueur placer ")
    const marker: Marker = this.map.addMarkerSync({
      title: this.information.result.name, //"Restaurant",
      icon: 'red',
      animation: 'DROP',
      position: this.map.getCameraPosition().target
    });
  }

  // selectSearchResult(item){
  //   this.clearMarkers();
  //   let autocompleteItems = [];

  //   this.geocoder.geocode({'placeId': item.place_id}, (result, status) => {
  //     // if(status === 'OK' && results[0]){
  //       // let position = {
  //       //     lat: results[0].geometry.location.lat,
  //       //     lng: results[0].geometry.location.lng
  //       // };
  //       let marker = new Google.maps.Marker({
  //         position: this.information[0].geometry.location,
  //         map: this.map
  //       });
  //       this.markers.push(marker);
  //       // this.map.setCenter(results[0].geometry.location);
  //     }
  //   )
  // }

  // clearMarkers() {
  //   for (var i = 0; i < this.markers.length; i++) {
  //     console.log(this.markers[i])
  //     this.markers[i].setMap(null);
  //   }
  //   this.markers = [];
  // }



}
