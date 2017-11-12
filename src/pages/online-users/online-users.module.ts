import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineUsersPage } from './online-users';

@NgModule({
  declarations: [
    OnlineUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(OnlineUsersPage),
  ],
})
export class OnlineUsersPageModule {}
