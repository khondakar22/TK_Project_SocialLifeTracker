import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController, NavParams,Slides } from 'ionic-angular';
import { FavouritePlacePage } from '../favourite-place/favourite-place';
import { ActivityRecordsPage } from '../activity-records/activity-records';
import { UserManagementPage } from '../user-management/user-management';
import { SocialComponentsPage } from '../social-components/social-components';
import { TimelinePage } from '../timeline/timeline'
import { GamificationPage } from '../gamification/gamification';

@Component({
  selector: 'page-features',
  templateUrl: 'features.html',
})
export class FeaturesPage implements OnInit {

    index: any; 
 
  @ViewChild(Slides) slides: Slides;
  imgagesSlides=[

    {
      name:'Favorite Place',
      description:`By not going to school I learned that the world is a beautiful
                    place and needs to be discovered`,
      image: 'assets/imgs/sliding-Images/MIS_RC_Code_Google_s.jpg' 
    },						
    {
      name:'User Management',
      description:`User Management is an authentication feature that provides 
             administrators with the ability to identify and control the 
             state of users logged into their profile`,
      image: 'assets/imgs/sliding-Images/user.png' 
    },
    {
      name:'Timeline',
      description:`Your timeline in Google Maps helps you find the 
             places you've been and the routes you've traveled. `,
      image: 'assets/imgs/sliding-Images/timeline.png' 
    },
    {
      name:'Activity Records',
      description:`What are some of the daily activities that you do at outside? 
            Swiming, Walking, Running, To visit your daily activites join this room`,
      image: 'assets/imgs/sliding-Images/bicycle-rider.png' 
    },
    {
      name:'Social Components',
      description:`A social network is a social structure made up of a set of social actors, 
            'sets of dyadic ties, and other social interactions between actors. 
            You will find your social actors into this section`,
      image: 'assets/imgs/sliding-Images/megaphone.png' 
    },
    {
      name:'Gamification',
      description:`Gamification is the craft of deriving all the fun and addicting elements 
            found in games and applying them to real-world or productive activities. `,
      image: 'assets/imgs/sliding-Images/air-hockey.png' 
    }
    ]; 
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeaturesPage');
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }


  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    this.index = currentIndex; 
    console.log(this.index);
  }

  enterPages(){
    if(this.index =='1'){
      this.navCtrl.setRoot('UserManagementPage');
    }else if(this.index =='2'){
      this.navCtrl.setRoot('TimelinePage');
    }else if(this.index =='3'){
      this.navCtrl.setRoot('ActivityRecordsPage');
    }else if(this.index =='4'){
      this.navCtrl.setRoot('SocialComponentsPage');
    }else if(this.index =='5'){
      this.navCtrl.setRoot('GamificationPage');
    }else{
      this.navCtrl.setRoot('FavouritePlacePage');
    }
  }
}
