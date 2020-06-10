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
    // recupère les catégories d'activitées selectionner
    console.log(getSelectedSubject)
    this.selectedType = getSelectedSubject
    console.log(this.selectedType)
    this.activitiesSave = JSON.stringify(this.selectedType)
    localStorage.setItem('activitiesSave', this.activitiesSave);

  }

  allClickedCategories() {
    this.getSelectedSubject = ["Sport", "Restauration", "Art", "Magasin", "Cinema", "Park", "Casino", "Boite", "Bar", "Monument_religieux", "Beaute", "Animaux", "Librairie", "Nature"];
  }


  ngOnInit() {
    // initialise les données avec les données suavegarder dans le locale storage
    this.getSelectedSubject = JSON.parse(localStorage.getItem('activitiesSave'))
    this.position = parseInt(localStorage.getItem("position"))
    
  }

  remplissageStockage() {
    // remplissage du locale storage
    this.activitiesSave = JSON.stringify(this.selectedType)
    localStorage.setItem('activitiesSave', this.activitiesSave);

    this.activitiesSave = JSON.stringify(this.position)
    localStorage.setItem('position', this.position);
  }

}


