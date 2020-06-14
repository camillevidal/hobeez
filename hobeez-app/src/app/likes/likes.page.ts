import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-details',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit {

  cards: Array<{
    img: string,
    title: string,
    description: string,
    place_id:string
  }>;

  constructor(private navCtrl: NavController) { 
    if(!localStorage.getItem("likes") || localStorage.getItem("likes") == null){
      this.cards = []
    }
    else{
      this.cards = JSON.parse(localStorage.getItem("likes"))
    }
    console.log(this.cards)
  }

  ngOnInit() {}


  showDetails(index){
    console.log(this.cards[index])
    localStorage.removeItem("place_id")
    localStorage.setItem("place_id", this.cards[index].place_id)
    localStorage.removeItem("photo_reference")
    localStorage.setItem("photo_reference", this.cards[index].img)
    this.navCtrl.navigateForward('/tabs/details');
  }


}
