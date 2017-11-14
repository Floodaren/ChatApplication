import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import io from "socket.io-client";
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  message:any
  messages:any = [];
  username:any;
  socket:any;
  constructor(public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController) {
  }

  async ionViewDidEnter()
  {
    this.socket =  await io("http://localhost:3000");
    await this.socket.on('recieveChatMessages', function(data)
    {
      this.messages.push(data);
      //this.content.scrollToBottom();   
    }.bind(this));
    await this.getUserName();
    await this.socket.emit('showUsers', {userId: this.socket.id, userName: this.username});
  }

  async submitMessage()
  {
    await this.getUserName();
    if (this.message == "" || this.message == undefined)
    {
      this.presentAlert();
    }
    else 
    {
      this.socket.emit('sendMessage', {message: this.message, username: this.username});
      this.message = "";
      //this.content.scrollToBottom();   
    }
  }

  async getUserName()
  {
    await this.storage.get('userName').then((val) => { 
      this.username = val;
    });
  }

  ionViewDidLeave()
  {
    this.socket.disconnect();
    this.socket.close(); 
  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Inget meddelande',
      subTitle: 'Du har inte skrivit någon text, försök igen',
      buttons: ['OK']
    });
    alert.present();
  }
  
}

