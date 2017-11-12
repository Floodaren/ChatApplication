import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import io from "socket.io-client";


@IonicPage()
@Component({
  selector: 'page-online-users',
  templateUrl: 'online-users.html',
})
export class OnlineUsersPage {
  socket:any;
  onlineUsers:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidEnter() {
    this.socket = io("http://localhost:3000");
    this.socket.emit('showUsers');
    this.socket.on('returnOnlineUsers', function(data){
      this.onlineUsers = [];
      data.onlineUsers.forEach(element => {
        this.onlineUsers.push(element);
      });
      console.log(this.onlineUsers);
    }.bind(this));
    
  }

  ionViewDidLeave()
  {
    this.socket.disconnect();
    this.socket.close(); 
  }

}
