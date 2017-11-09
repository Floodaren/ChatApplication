import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import io from "socket.io-client";
import { App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import CryptoJS from 'crypto-js';

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {
  socket = io("http://localhost:3000");
  username:any;
  password:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app:App, private alertCtrl: AlertController) {
  }

  handleSubmit()
  {
    if (this.username == undefined || this.password == undefined || this.username == "" || this.password == "")
    {
      this.presentAlert("Fel","Något av fälten är tomma, försök igen");
    }
    else 
    {
      var encryptedPassword = CryptoJS.SHA256(this.password);
      var passwordToDb = "";
      encryptedPassword.words.forEach(element => {
        var convertToString = String(element);
        passwordToDb += convertToString;
      });
      this.socket.emit('registerUser', {username: this.username, password: passwordToDb});
      this.socket.on('userRegisterd', function(data){
        if (data.successOrNot === "true")
        {
          this.app.getRootNav().setRoot(TabsPage);
          this.presentAlert("Lyckades", "Ditt konto är nu skapat, vänligen logga in");
        }
        else 
        {
          this.presentAlert("Fel", "Användaren finns redan, försök igen");
          this.username = "";
          this.password = "";
        }
      }.bind(this));
    }
  }

  presentAlert(inputTitle, inputSubtitle) {
    let alert = this.alertCtrl.create({
      title: inputTitle,
      subTitle: inputSubtitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
