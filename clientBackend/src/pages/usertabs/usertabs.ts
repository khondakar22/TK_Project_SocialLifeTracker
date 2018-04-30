import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { FeaturesPage } from '../features/features';

@Component({
  selector: 'page-usertabs',
  templateUrl: 'usertabs.html',
})
export class UsertabsPage {
  tab1Root = FeaturesPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsertabsPage');
  }

}
