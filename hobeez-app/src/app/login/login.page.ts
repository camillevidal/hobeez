import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { sha256 } from 'js-sha256';
import { User } from '../User';
import { Token } from '../Token';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  user: User = null
  token: String = null;

  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private userService: UserService, private alert: AlertController) {
    let hide = document.getElementById("logged")



  }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });


  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  loadToken(){
    // A ENLEVER EN VERSION FINALE
    localStorage.setItem("login", "romain@mail.com")
    localStorage.setItem("mdp", "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8")
    ///

    // Si le token n'est pas présent dans le local storage le setter 
    if(localStorage.getItem("jwt_token") == null || localStorage.getItem("jwt_token") == undefined || !localStorage.getItem("jwt_token") ||localStorage.getItem("jwt_token" ) == "undefined" || localStorage.getItem("jwt_token") == "null"){

      this.userService.getToken(this.validations_form.get('email').value, this.validations_form.get('password').value).subscribe(value => {
        console.log("value ", JSON.parse(value));
        localStorage.setItem("jwt_token",JSON.parse(value).token)
        return
      })

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


  loginUser() {
    this.loadToken()
    this.token = localStorage.getItem("jwt_token")
    // this.userService.getToken(this.validations_form.get('email').value, this.validations_form.get('password').value).subscribe(value => {
    //   this.token = JSON.parse(value).token
     

      
      
    // })
   

      let email = this.validations_form.get('email').value
      email = email.toLowerCase()
      let password = this.validations_form.get('password').value
      var hash = sha256.create();
      hash.update(password);
      hash.hex();
      let pass = hash.toString()
      console.log("pass from login "+pass)
      
      this.userService.login(email,pass,this.token).subscribe(value => {
        this.user = value
        let userPass = value.pass

        console.log(" pass from db  "+userPass)
        
        
        if (this.user == null) {
          this.alertUserInconnu()
          this.navCtrl.navigateForward('/tabs/register');
        }
        else if (userPass != pass) {
          this.alertWrongPassword()
        }

        else if (userPass == pass) {
          console.log("okkkkkkkaaayyyyyyyy")
          localStorage.setItem("login", email)
          this.navCtrl.navigateForward('tabs/home');
          let hide = document.getElementById("logged")
          hide.style.visibility = "visible"
        }
      },
        error => {
          this.alertUserInconnu()
        }


      );
    

  }

  async alertUserInconnu() {
    const alert = await this.alert.create({
      header: 'Alert',
      message: "Utilisateur inconnu. Veuillez-vous inscrire pour accéder à l'inscription.",
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertWrongPassword() {
    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: "Mot de passe incorrect.",
      buttons: ['OK']
    });

    await alert.present();
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/tabs/register');
  }

  ionViewDidEnter() {
    //document.getElementById("appLogout").style.visibility = "hidden"
  }

}