import { Component } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import CryptoJS from 'crypto-js';
import io from "socket.io-client";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  message:any
  messages:any = [];
  socket = io("http://localhost:3000");
  constructor(public navCtrl: NavController) {
    this.socket.on('recieveChatMessages', function(data){
      
      this.messages.push(data.messageToEveryone);   
    }.bind(this));
    
  }



  submitMessage()
  {
    this.socket.emit('sendMessage', {message: this.message});
    this.message = "";
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
