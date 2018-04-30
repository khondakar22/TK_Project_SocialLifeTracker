import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class FacebookProvider {

  constructor(public facebook: Facebook) {
    console.log('Hello FacebookProvider Provider');
  }

  login(){
   return this.facebook.login(['email','public_profile','user_photos','user_posts']);
  }

  getLoginStatus(){
    return this.facebook.getLoginStatus();
  }

}
