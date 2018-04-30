import {
  Component,
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  SetActivity
} from "../../models/setActivites";

import {
  TimelineProvider
} from '../../providers/timeline/timeline';
import {
  Storage
} from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {

  setActivity:SetActivity[]=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public timelineProvider: TimelineProvider,
    public storage: Storage,
    //  private datePicker: DatePicker
  ) {
    // this.today = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
   
    // console.log(this.dataInicial);
    this.searchTheActivity()
  }



  searchTheActivity(){
    console.log('ff');
    this.storage.get('userId').then((userId)=>{
      this.timelineProvider.getActivityForTimeline(userId).subscribe(
        data => { 
          for( let item of data){
            item.distance = this.getDistanceFromLatLonInKm(
              item.location.start.lat,
              item.location.start.lng,
              item.location.end.lat,
              item.location.end.lng );
            item.timedelta = new Date(item.end).valueOf() - new Date(item.start).valueOf();
            item.timedelta = this.TimeforHumans( item.timedelta / 1000 );
            this.setActivity.push(item);
            
          }; 

        },
        
        error=> console.log('ActivityRecords Fetching Error', error)
      );
    }).catch( err => console.log(err) );
  
  }


  /**
  * @description- Change the Footbar to default if token is null
  * @author-Khondakar Readul Islam
  * @memberOf ActivityRecords
  */
 getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos( this.deg2rad(lat1)) * Math.cos( this.deg2rad(lat2) ) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = Math.round(R * c); // Distance in km
  return d;
}
/**
* @description- Change the Footbar to default if token is null
* @author-Khondakar Readul Islam
* @memberOf ActivityRecords
*/
deg2rad(deg) {
  return deg * (Math.PI/180)
}


/**
* @description- Change the Footbar to default if token is null
* @author-Khondakar Readul Islam
* @memberOf ActivityRecords
*/
TimeforHumans ( seconds ) {
  var levels = [
      [Math.floor(seconds / 31536000), 'years'],
      [Math.floor((seconds % 31536000) / 86400), 'days'],
      [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
      [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
      [(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds'],
  ];
  var returntext = '';

  for (var i = 0, max = levels.length; i < max; i++) {
      if ( levels[i][0] === 0 ) continue;
      returntext += ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? 
        levels[i][1].toString().substr( 0 , ( levels[i][1]).toString().length - 1 ) : levels[i][1]);
  };
  return returntext.trim();
}

}
