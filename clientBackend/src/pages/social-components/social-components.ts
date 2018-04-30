import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-social-components',
  templateUrl: 'social-components.html',
})
export class SocialComponentsPage {

  tap:number = 0;

 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialComponentsPage');
  }
  tapEvent(e) {
    this.tap++
}

}