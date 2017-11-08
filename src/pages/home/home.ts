import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  
  constructor(public navCtrl: NavController) {
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
