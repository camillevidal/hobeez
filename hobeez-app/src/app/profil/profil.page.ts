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
  activities = ["Sport", "Restauration", "Art", "Magasin", "Cinema", "Park", "Casino", "Boite", "Bar", "Monument_religieux", "Beaute", "Animaux", "Librairie", "Nature"];
  constructor(public toastController: ToastController) { 
    // this.platform.ready().then(()=>{
    //   this.categorie =[""]
    // })
  }
  async openToast() {
    const toast = await this.toastController.create({
      message: 'Changement sauvegarder ',
      duration: 2000
    });
    toast.present();
    this.remplissageStockage();
  }

  private toppings;

  // read(){
  //   console.log(this.activities);
  // }

  getSelectedSubjectValue(getSelectedSubject){

    console.log(getSelectedSubject)
    this.selectedType = getSelectedSubject

  }
  // onSelectChange(evt: CustomEvent<SelectChangeEventDetail>): void {
  //   this.all = evt.detail.value;
  //   if(this.all === this.activities){
  //     this.allSelected = true;
  //   }
  //   else{
  //     this.allSelected = true;
  //   }
  // }

  ngOnInit() {
  }

  // } 
  remplissageStockage() {
    console.log('111111111')
    console.log(this.selectedType)
    this.activitiesSave = JSON.stringify(this.selectedType)
    localStorage.setItem('activitiesSave', this.activitiesSave);
  }

}


