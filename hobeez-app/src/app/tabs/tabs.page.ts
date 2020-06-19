import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  login:boolean;

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
    // this.login = false;
    // if(this.router.url == '/login'){
    //   this.login = true;
    // }
  }

  profil(){
      this.navCtrl.navigateForward('tabs/profil');

  }

  async logout(){
    this.navCtrl.navigateForward('tabs/login');
  }


}
