import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsertabsPage } from '../usertabs/usertabs';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import {Location} from '../../models/location'; 

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{

  tap:number = 0;
  location: Location;
  index: number;
  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  tapEvent(e) {
    this.tap++
}

/**
 * 
 * 
 * 
 * @memberOf ProfilePage
 */
ngOnInit() {
  this.location = this.navParams.get('location');
  this.index = this.navParams.get('index');
}

 /**
 * @description- Get the token value form sqlLite Storage
 * @author-Khondakar Readul Islam
 * @type {Promise<any>}
 * @memberOf UserManagementPage
 */
token:Promise<any> = this.storage.get('token').then((val)=>{
  return this.token = val;
}).catch(
  (err)=>{
    console.log(err);
  }
)

/**
* @description- Change the Footbar to default if token is null
* @author-Khondakar Readul Islam
* @memberOf UserManagementPage
*/
goToRootAgain(){
  this.storage.get('token').then((val)=>{
    if(val==null){
      this.navCtrl.setRoot(TabsPage); 
    }else{
      this.navCtrl.setRoot(UsertabsPage); 
    }
  })
}
}
