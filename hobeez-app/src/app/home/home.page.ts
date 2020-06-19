import { Component, OnInit } from '@angular/core';
import { ActiviteService } from '../activite.service'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { logging } from 'protractor';
import { DetailsService } from './../details.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  cards: Array<any>;
  activiteService: ActiviteService
  detailService: DetailsService
  localisation: Array<number>


  constructor(as: ActiviteService, private geolocation: Geolocation, private ds: DetailsService) {

    this.cards = [];
    this.activiteService = as;
    this.detailService = ds
    this.getLocation()
    this.loadToken()

  }

  getLocation(): Array<number> {
    let loc = new Array<number>()
    this.geolocation.getCurrentPosition().then((resp) => {
      loc.push(resp.coords.longitude)
      loc.push(resp.coords.latitude)
      this.localisation = loc
      return loc;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    return;
  }

  getAllactivite() {

    let perimetre = parseInt(localStorage.getItem("perimetre"))
    if (!perimetre || perimetre == 0) {
      perimetre = 10
    }

    if (!localStorage.getItem("open_now") || !localStorage.getItem("open_now") == null) {
      localStorage.setItem("open_now", JSON.stringify(false))
    }

    let open_now = JSON.parse(localStorage.getItem("open_now"))

    let types: Array<string>
    console.log(localStorage.getItem("activitiesSave"))
    if (!localStorage.getItem("activitiesSave") || localStorage.getItem("activitiesSave") == "undefined") {
      types.push("empty")

    }
    else {
      types = JSON.parse(localStorage.getItem("activitiesSave"))
    }



    types.forEach(type => {
      this.activiteService.getAllActivities(perimetre, this.localisation[0], this.localisation[1], type, this.loadToken()).subscribe(reponse => {
        reponse.results.forEach(act => {
          let t = JSON.stringify(act.photos)
          let deb = t.indexOf("photo_reference") + 18
          let end = t.indexOf("width") - 3
          let photo_ref = t.substring(deb, end)

          let likes = JSON.parse(localStorage.getItem("likes"))
          if (!likes || likes == null) {
            likes = []
          }
          console.log(likes)

          if (act.business_status && photo_ref) {
            if (act.opening_hours.open_now == true && open_now == true || open_now == false) {
              let card = {
                img: "https://parismatch.be/app/uploads/2018/04/Macaca_nigra_self-portrait_large-e1524567086123-1100x715.jpg",
                title: act.name,
                description: act.rating,
                place_id: act.place_id
              }
              // let found = false
              // likes.forEach(lk => {
              //   if(lk.place_id == act.place_id && found == false){
              //     found = true
              //   }
              // });
              // if(!found){
              //   this.cards.push(card)
              // }
              this.activiteService.getImage("AIzaSyAJGFKkkmz3kSekRLtX5TCVtV9mUYRuWgs", photo_ref, 260, 180).subscribe(photoUrl => {
                let card = {
                  img: JSON.parse(photoUrl).url,
                  title: act.name,
                  description: act.rating,
                  place_id: act.place_id
                }
                let found = false
                likes.forEach(lk => {
                  if (lk.place_id == act.place_id && found == false) {
                    found = true
                  }
                });
                if (!found) {
                  this.cards.push(card)
                }
              }, (error) => {

                let card = {
                  img: error.url,
                  title: act.name,
                  description: act.rating,
                  place_id: act.place_id
                }
                let found = false
                likes.forEach(lk => {
                  if (lk.place_id == act.place_id && found == false) {
                    found = true
                  }
                });
                if (!found) {
                  this.cards.push(card)
                }
              })

            }


          }
          if (act == reponse.results[reponse.results.length - 1]) {
            this.shuffle(this.cards)
          }

        });
        // console.log(reponse.results[0].place_id)

      });
    });

  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  loadToken() {
    // A ENLEVER EN VERSION FINALE


    // Si le token n'est pas présent dans le local storage le setter 
    if (localStorage.getItem("jwt_token") == null || localStorage.getItem("jwt_token") == undefined || !localStorage.getItem("jwt_token") || localStorage.getItem("jwt_token") == "undefined" || localStorage.getItem("jwt_token") == "null") {

      this.detailService.getToken(localStorage.getItem("login"), localStorage.getItem("mdp")).subscribe(value => {
        console.log("value ", JSON.parse(value));
        localStorage.setItem("jwt_token", JSON.parse(value).token)

        return JSON.parse(value).token
      })
      // localStorage.setItem("jwt_token", this.detailsService.getToken(localStorage.getItem("login"), localStorage.getItem("mdp")))
    }
    else {

      // récuperrer la date d'expiration du token et la comparer à la date actuel
      let token = localStorage.getItem("jwt_token")
      let token_save = token
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
      var date_exp = new Date(date_exp_number * 1000);

      var now = new Date()
      console.log("ICI MON GARS SURE")
      console.log()
      if (now > date_exp) {
        localStorage.setItem("jwt_token", "undefined")
        console.log("old token")
        this.loadToken()
      }
      else {
        console.log(date_exp)

        return token_save
      }

    }

  }

  // ngOnInit() {
  //     this.getLocation();
  // }


}
