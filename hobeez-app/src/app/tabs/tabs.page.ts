import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  profil(){
      this.navCtrl.navigateForward('tabs/profil');

  }

  async logout(){
    this.navCtrl.navigateForward('tabs/login');
  }


}
