import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavController } from '@ionic/angular';
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
  activities = ["Aquarium", "Art", "Bar", "Beauté", "Boite", "Bowling", "Café", "Casino", "Cinéma", "Coiffeur", "Eglise", "Librairie", "Magasin", "Mosquée", "Musée", "Parc", "Parc de jeux", "Restauration", "Spa", "Shopping", "Sport", "Stade", "Synagogue", "Zoo"];
  // activities = ["Sport", "Restauration", "Art", "Magasin", "Cinema", "Park", "Casino", "Boite", "Bar", "Monument_religieux", "Beaute", "Animaux", "Librairie", "Nature"];
  constructor(public toastController: ToastController, private navCtrl: NavController) { 
  }
  async openToast() {
    const toast = await this.toastController.create({
      message: 'Changement sauvegardé ',
      duration: 2000
    });
    toast.present();
    this.remplissageStockage();
    this.navCtrl.navigateForward('tabs/home');
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
    this.getSelectedSubject = this.activities;
  }


  ngOnInit() {
    // initialise les données avec les données suavegarder dans le locale storage
    this.getSelectedSubject = JSON.parse(localStorage.getItem('activitiesSave'))
    this.position = parseInt(localStorage.getItem("perimetre"))
    
  }

  remplissageStockage() {
    // remplissage du locale storage
    this.activitiesSave = JSON.stringify(this.selectedType)
    localStorage.setItem('activitiesSave', this.activitiesSave);

    this.activitiesSave = JSON.stringify(this.position)
    localStorage.setItem('perimetre', this.position);
  }

}


