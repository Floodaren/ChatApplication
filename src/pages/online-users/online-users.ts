import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import io from "socket.io-client";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-online-users',
  templateUrl: 'online-users.html',
})
export class OnlineUsersPage {
  socket:any;
  onlineUsers:any = [];
  username:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

  }

  async ionViewDidEnter() {
    this.socket = await io("http://localhost:3000");
    await this.getUserName();
    await this.socket.emit('showUsers', {userId: this.socket.id, userName: this.username});
    await this.socket.on('returnOnlineUsers', function(data){
      this.onlineUsers = [];
      data.onlineUsers.forEach(element => {
        this.onlineUsers.push(element);
      });
    }.bind(this));
    
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

}
