import { Component,OnInit } from '@angular/core';
import {  IonicPage,
          NavController, 
          NavParams,
          App,
          AlertController,
          LoadingController } from 'ionic-angular';
import { UsertabsPage } from '../usertabs/usertabs';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings';
import { User } from "../../models/user.model";
@IonicPage()
@Component({
  selector: 'page-user-management',
  templateUrl: 'user-management.html',
})
export class UserManagementPage implements OnInit { 
  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public storage: Storage,
              public appCtrl: App,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public userSetting: UserSettingsProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserManagementPage');
    this.storage.get('token').then((val)=>{
     console.log(val);
    }).catch(
      (err)=>{
        console.log(err);
      }
    );
  }
  /**
   * 
   * @description - Logout() method, It has two promise one is loading controller
   *                and other is alert controller. After that It clean the token
   *                from the local storage,
   * @author- Khondakar Readul Isla
   * @memberOf UserManagementPage
   */
  doLogout(){
    const alert = this.alertCtrl.create({
           title: 'Logout', 
           message: 'Do You Need fresh Air, We will always have been waiting for you',
           buttons:[
               {
                 text:'No',
                 role:'cancel',
                 handler:()=>{
                   console.log('cancel clicked'); 
                 }
               },
               {
                 text:'Yes',
                 handler:()=>{
                     const loading = this.loadingCtrl.create({
                       content:'Please come back again........'
                     });
                     loading.present().then(()=>{
                      this.storage.clear().then(()=>{
                        setTimeout(()=>{
                          window.location.reload();
                      }, 1000); 
                      this.appCtrl.getRootNav().setRoot(TabsPage)
                     });
                     })
                     

                   loading.onDidDismiss(() => {
                     console.log('Dismissed loading');
                   });
                 }
               }
           ]
    });
    alert.present();
   };

  ngOnInit(){
  
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
  );

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
  };

  /**
   * @description- Get the token value form sqlLite Storage
   * @author-Khondakar Readul Islam
   * @type {Promise<any>}
   * @memberOf UserManagementPage     } [description]
   */
  userId:Promise<any> = this.storage.get('userId').then((val)=>{
    return this.userId = val; 
  }).catch(
    (err)=>{
      console.log(err); 
    }
  )

/**
 * [onDeleted description]
 * @description- For the deleted user from NodeJs DataBase
 * @author- Khondakar Readul Islam 
 * @memberOf UserManagementPage
 */
  onDeleted(){
     this.userSetting.deleted(this.userId).subscribe(
        data=>{
          const alert = this.alertCtrl.create({
            title: 'Delete Account', 
            message: 'Is there anything wrong, you can contact with us before leave us',
            buttons:[
                {
                  text:'Cancel',
                  role:'cancel',
                  handler:()=>{
                    console.log('cancel clicked'); 
                  }
                },
                {
                  text:'Delete',
                  handler:()=>{
                      const loading = this.loadingCtrl.create({
                        content:'You can register anytime, whenever you want..'
                      });
                      loading.present().then(()=>{
                       this.storage.clear().then(()=>{
                         setTimeout(()=>{
                           window.location.reload();
                       }, 1000); 
                       this.appCtrl.getRootNav().setRoot(TabsPage)
                      });
                      })
                      
 
                    loading.onDidDismiss(() => {
                      console.log('Dismissed loading');
                    });
                  }
                }
            ]
     });
     alert.present();
        },
        error=>{
          const alert = this.alertCtrl.create({
          title: 'sigin failed!',
          message: error.message,
          buttons: ['Ok']
        });
          alert.present();
      }
        
     )
  };



/**
 * [onResetPassword description]
 * @author- Khondakar Readul Islam 
 * @memberOf UserManagementPage
 */
onResetPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Enter a new Password for your account, you're so keen on adding",
      inputs:   [
                    {
                      name: 'password',
                      placeholder: 'Password'
                    },
                ],
      buttons:  [
                    {
                      text: 'Cancel',
                      handler: data => {
                        console.log('Cancel clicked');
                      }
                    },
                    {
                      text: 'Save',
                      handler: data => {

                          const user = new User(
                                  data.userName, 
                                  data.userRole,
                                  data.emailAddress, 
                                  data.password, 
                                  data.firstName, 
                                  data.lastName
                            ); 

                          const alert = this.alertCtrl.create({
                            title: 'Reset Password', 
                            message: 'Are you Sure to change your Password',
                            buttons:[
                                    {
                                        text:'Cancel',
                                        role:'cancel',
                                        handler:()=>{
                                          console.log('cancel clicked'); 
                                        }
                                    },
                                    {
                                        text:'Yes',
                                        handler:()=>{
                                                      const loading = this.loadingCtrl.create({
                                                      content:'Thanks for your patient, Give us please a little moment...'
                                                      });
                                                      this.userSetting.resetPass(user,this.userId).subscribe(
                                                          data=>{
                                                                   loading.present().then(()=>{
                                                                        this.storage.clear().then(()=>{
                                                                             setTimeout(()=>{
                                                                               window.location.reload();
                                                                             }, 1000); 
                                                                             this.appCtrl.getRootNav().setRoot(TabsPage)
                                                                        });
                                                                    });
                                                                    loading.onDidDismiss(() => {
                                                                      console.log('Dismissed loading');
                                                                    });
                                                          },
                                                          error=>{
                                                                    const alert = this.alertCtrl.create({
                                                                        title: 'sigin failed!',
                                                                        message: error.message,
                                                                        buttons: ['Ok']
                                                                    });
                                                                    alert.present();
                                                          }
                                                      )

                                        }
                                    }
                            ]
                          });
                          alert.present();
                      }
                    }
                ]
    });
    prompt.present();
}




}
