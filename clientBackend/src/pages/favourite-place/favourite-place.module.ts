import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritePlacePage } from './favourite-place';

@NgModule({
  declarations: [
    FavouritePlacePage,
  ],
  imports: [
    IonicPageModule.forChild(FavouritePlacePage),
  ],
})
export class FavouritePlacePageModule {}
