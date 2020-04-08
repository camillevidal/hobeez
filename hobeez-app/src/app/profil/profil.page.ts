import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage{
  activitiesSave = ""
  selectedType = []
  getSelectedSubject = []
  lastPosition
  position
  activities = ["Sport", "Restauration", "Art", "Magasin", "Cinema", "Park", "Casino", "Boite", "Bar", "Monument_religieux", "Beaute", "Animaux", "Librairie", "Nature"];
  constructor(public toastController: ToastController) { 
  }
  async openToast() {
    const toast = await this.toastController.create({
      message: 'Changement sauvegardé ',
      duration: 2000
    });
    toast.present();
    this.remplissageStockage();
  }


  getSelectedSubjectValue(getSelectedSubject){

    console.log(getSelectedSubject)
    this.selectedType = getSelectedSubject

  }


  ngOnInit() {
    this.getSelectedSubject = JSON.parse(localStorage.getItem('activitiesSave'))
    this.position = parseInt(localStorage.getItem("position"))
    
  }

  remplissageStockage() {
    console.log(this.selectedType)
    this.activitiesSave = JSON.stringify(this.selectedType)
    localStorage.setItem('activitiesSave', this.activitiesSave);

    this.activitiesSave = JSON.stringify(this.position)
    console.log(this.position)
    localStorage.setItem('position', this.position);
  }

}


