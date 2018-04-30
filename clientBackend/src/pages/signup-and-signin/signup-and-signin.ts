import {
  Component,
  OnInit
} from '@angular/core';

import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  App
} from 'ionic-angular';

import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

import { Storage } from '@ionic/storage';
import { UserSettingsProvider } from '../../providers/user-settings/user-settings'
import { User } from "../../models/user.model";
import { UsertabsPage } from '../usertabs/usertabs';

@Component({
  selector: 'page-signup-and-signin',
  templateUrl: 'signup-and-signin.html',
})
export class SignupAndSigninPage {

  selectOptions = ['Admin', 'Editor', 'Modarator'];
  signUpForm: FormGroup;
  signInForm: FormGroup

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: Storage,
    public userService: UserSettingsProvider,
    public appCtrl: App
  ) {}

  ngOnInit() {
    this.initializeSignInForm();
    this.initializeSignUpForm();

  }



  /**
   * @description- Siginup Method
   * @author-Khondakar Readul Islam
   * @version-0.0.1
   * @memberOf UseraccountPage
   */
  signUp() {
    const value = this.signUpForm.value;
    const user = new User(
      value.userName,
      value.userRole,
      value.emailAddress,
      value.password,
      value.firstName,
      value.lastName
    );
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.userService.createUser(user)
      .subscribe(
        data => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Signup Successfull!',
            message: 'Please login to visit your profile!',
            buttons: ['Ok']
          });
          alert.present();
          this.signUpForm.reset();
        },
        error => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Signup failed!',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        }
      );

  };

  /**
   * [segmentChanged description]
   * @author-Khondakar Readul Islam
   * @version 1.0.0
   * @param {[type]} friends [description]
   * @param {[type]} enemies [description]
   * 
   */
  signIn() {
    const value = this.signInForm.value;
    const user = new User(
      value.userName,
      value.userRole,
      value.emailAddress,
      value.password,
      value.firstName,
      value.lastName
    );
    const loading = this.loadingCtrl.create({
      content: 'We are searching you thanks for your patience ...'
    });
    loading.present();
    this.userService.loggin(user)
      .subscribe(
        data => {
          loading.dismiss();
          this.storage.set('token', data.token);
          this.storage.set('userId', data.userId);
          const alert = this.alertCtrl.create({
            title: 'Wellcome to your own world',
            message: 'Enjoy your tour with cool features',
            buttons: ['Ok']
          });
          alert.present().then(() => {
            this.appCtrl.getRootNav().setRoot(UsertabsPage)
              .then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);

              });
          });
          this.signInForm.reset();
        },
        error => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'sigin failed!',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        }
      );
  }





  private initializeSignUpForm() {
    let userName = '';
    let userRole = '';
    let emailAddress = '';
    let password = '';
    let firstName = '';
    let lastName = '';

    this.signUpForm = new FormGroup({
      'userName': new FormControl(userName, Validators.required),
      'userRole': new FormControl(userRole, Validators.required),
      'emailAddress': new FormControl(emailAddress, Validators.required),
      'password': new FormControl(password, Validators.required),
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
    });
  };

  private initializeSignInForm() {
    let emailAddress = '';
    let password = '';

    this.signInForm = new FormGroup({
      'emailAddress': new FormControl(emailAddress, Validators.required),
      'password': new FormControl(password, Validators.required),
    });
  };



}
