import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsertabsPage } from '../usertabs/usertabs';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-gamification',
  templateUrl: 'gamification.html',
})
export class GamificationPage {
 
  constructor(  public navCtrl: NavController,
                public navParams: NavParams,
                public storage: Storage) {
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad GamificationPage');
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
