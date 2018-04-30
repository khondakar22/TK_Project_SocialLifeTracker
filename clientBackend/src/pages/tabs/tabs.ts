import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { SignupAndSigninPage } from '../signup-and-signin/signup-and-signin';

import { Storage } from '@ionic/storage';
import { NavParams } from 'ionic-angular';
import { OnInit } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {


    
    tab1Root = SignupAndSigninPage;
    tab2Root = AboutPage;
    tab3Root = ContactPage;


  constructor(private storage: Storage, public navParam:NavParams ) {

  }

  ngOnInit(){
  }

ionViewDidLoad(){
                                                                                                                                                                                                                                                                        

}

    
  

}
