import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {FacebookProvider} from '../../providers/facebook/facebook';
import { FacebookPage } from '../facebook/facebook'; 

@IonicPage()
@Component({
  selector: 'page-facebook-signin',
  templateUrl: 'facebook-signin.html',
})
export class FacebookSigninPage {

  constructor(public navCtrl: NavController, private plt: Platform, public navParams: NavParams, private facebookProvider: FacebookProvider) {
    this.plt.ready().then(()=>{
      this.facebookProvider.getLoginStatus().then(data=>{
        if(data.status === 'connected'){
          this.navCtrl.setRoot('FacebookPage');
        }
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacebookSigninPage');
  }

  logginFB(){
    this.facebookProvider.login().then(data=>{
      console.log('login', data); 
      this.navCtrl.setRoot('FacebookPage');
    })
  }

}
