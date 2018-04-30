import { Component,ViewChild } from '@angular/core';
import { Platform, NavController,Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { UsertabsPage } from '../pages/usertabs/usertabs';
import { ProfilePicturePage } from '../pages/profile-picture/profile-picture';
import { FindFriendsPage } from '../pages/find-friends/find-friends';
import { SetActivitiesPage } from '../pages/set-activities/set-activities';
import { FacebookSigninPage } from '../pages/facebook-signin/facebook-signin';
import { ChatBotPage } from '../pages/chat-bot/chat-bot';

import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, icon:string}>;
  
  rootPage:any = TabsPage;
  hometabs:any = UsertabsPage;

  constructor(platform: Platform, 
       statusBar: StatusBar, 
       splashScreen: SplashScreen,
      public storage: Storage,
    ) {
                        platform.ready().then(() => {
                          statusBar.styleDefault();
                          splashScreen.hide();
                        });
      this.pages = [
        { title: 'Add Profile Picture', component: 'ProfilePicturePage',icon:'camera' },
        { title: 'Find Friends', component: 'FindFriendsPage',icon:'search' },
        { title: 'Set your Activities', component: 'SetActivitiesPage',icon:'walk' },
        { title: 'Signin via Facebook/Google', component: 'FacebookSigninPage',icon:'log-in' },
        { title: 'Chat with Friends', component: 'ChatBotPage',icon:'chatboxes' },

      ];
    
  }
  ngOnInit(){

    this.storage.get('token').then((val)=>{
      if(val!==null){
        this.rootPage = UsertabsPage; 
      }
    })
  
  }
 /**
   * @description- Get the token value form sqlLite Storage
   * @author-Khondakar Readul Islam
   * @type {Promise<any>}
   * @memberOf MyApp
   */
  token:Promise<any> = this.storage.get('token').then((val)=>{
    return this.token = val;
  }).catch(
    (err)=>{
      console.log(err);
    }
  )
ionViewDidLoad(){

 
}



goToRootAgain(){
  this.nav.setRoot(TabsPage);
}

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
