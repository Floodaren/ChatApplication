import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import CryptoJS from 'crypto-js';
import io from "socket.io-client";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  message:any
  messages:any = [];
  username:any;
  socket = io("http://localhost:3000");
  constructor(public navCtrl: NavController, private storage: Storage, private alertCtrl: AlertController) {

    this.socket.on('recieveChatMessages', function(data)
    {
      this.messages.push(data);
      this.content.scrollToBottom();   
    }.bind(this));
    
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
      this.content.scrollToBottom();   
    }
  }

  async getUserName()
  {
    await this.storage.get('userName').then((val) => { 
      this.username = val;
    });
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

    /*
    Encrypt with SHA256 and the later check if both encrypted strings are equal.
    var sha256 = CryptoJS.SHA256("hejsan");
    var sha2562 = CryptoJS.SHA256("hejsadsan");
    var matchorNot:boolean = false;
    
    for (var i = 0; i<sha256.words.length;i++)
    {
      if (sha256.words[i] == sha2562.words[i])
      {
        matchorNot = true;
      }
      else 
      {
        matchorNot = false;
      }
    }
    if (matchorNot == true)
    {
      console.log("inloggad");
    }
    */

    /*
    Encrypt with AES, decrypt and get the decrypted message.
    var hejsan = CryptoJS.AES.encrypt('haha',"myKey");
    var decryptText =CryptoJS.AES.decrypt(hejsan.toString(), 'myKey');
    this.x = decryptText.toString(CryptoJS.enc.Utf8)
    */
