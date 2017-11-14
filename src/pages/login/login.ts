import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';
import io from "socket.io-client";
import { TabsPage } from '../tabs/tabs';
import CryptoJS from 'crypto-js';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  socket:any;
  username:any;
  password:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private storage: Storage, private app:App) {
    
  }

  handleSubmit()
  {
    this.socket =  io("http://localhost:3000");
    var encryptedPassword = CryptoJS.SHA256(this.password);
    var passwordToDb = "";
    encryptedPassword.words.forEach(element => {
      var convertToString = String(element);
      passwordToDb += convertToString;
    });
    this.socket.emit('loginUser', {username: this.username, password: passwordToDb});
    this.socket.on('loggedInOrNot', function(data)
    {
      if (data.length == 0)
      {
        this.presentAlert();
      }
      else 
      {
        this.storage.set('userId', data[0].Id);
        this.storage.set('userName', data[0].Username);
        this.checkIfLoggedIn();
      }
      
    }.bind(this)); 
  }

  async checkIfLoggedIn()
  {
    var userEmail;
    var userId;
    await this.storage.get('userName').then((val) => { 
      userEmail = val;
    });
    await this.storage.get('userId').then((val) => {
      userId = val;
    });
    if (userEmail != undefined && userId != undefined)
    {
      this.socket.disconnect();
      this.socket.close(); 
      this.app.getRootNav().setRoot(TabsPage);
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Ingen träff',
      subTitle: 'Felaktigt login, försök igen',
      buttons: ['OK']
    });
    alert.present();
  }

}
