import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialComponentsPage } from './social-components';

@NgModule({
  declarations: [
    SocialComponentsPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialComponentsPage),
  ],
})
export class SocialComponentsPageModule {}
