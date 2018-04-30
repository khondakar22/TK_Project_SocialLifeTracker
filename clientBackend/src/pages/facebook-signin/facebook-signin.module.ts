import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacebookSigninPage } from './facebook-signin';

@NgModule({
  declarations: [
    FacebookSigninPage,
  ],
  imports: [
    IonicPageModule.forChild(FacebookSigninPage),
  ],
})
export class FacebookSigninPageModule {}
