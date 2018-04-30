import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GamificationPage } from './gamification';

@NgModule({
  declarations: [
    GamificationPage,
  ],
  imports: [
    IonicPageModule.forChild(GamificationPage),
  ],
})
export class GamificationPageModule {}
