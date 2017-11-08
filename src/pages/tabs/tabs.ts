import { Component } from '@angular/core';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RegisterUserPage } from '../register-user/register-user';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})


export class TabsPage {
  loggedInOrNot:boolean = false;
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = LoginPage;
  tab5Root = RegisterUserPage;

  constructor(private storage: Storage) 
  {
    this.checkIfLoggedIn();
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
      this.loggedInOrNot = true;
    }
  }
}
