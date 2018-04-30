import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UsertabsPage } from '../usertabs/usertabs';
import { Storage } from '@ionic/storage';

import { SetActivity } from "../../models/setActivites";
import { Geolocation } from '@ionic-native/geolocation';
import { ActivityRecordsProvider } from '../../providers/activity-records/activity-records';





/**
 * 
 * 
 * @export
 * @class ActivityRecordsPage
 */
@IonicPage()
@Component({
  selector: 'page-activity-records',
  templateUrl: 'activity-records.html',
})
export class ActivityRecordsPage {

  /**
   * 
   * 
   * @type {string}
   * @memberOf ActivityRecordsPage
   */
  activity:string;
  walkingData:SetActivity [] = [];
  cyclingData:SetActivity [] = [];
  drivingData:SetActivity [] = [];

    /**
     * Creates an instance of ActivityRecordsPage.
     * @param {NavController} navCtrl 
     * @param {NavParams} navParams 
     * @param {Storage} storage 
     * @param {Geolocation} geolocation 
     * @param {ActivityRecordsProvider} ActivityRecordsProvider 
     * 
     * @memberOf ActivityRecordsPage
     */
    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public storage: Storage,
      public geolocation: Geolocation,
      public ActivityRecordsProvider : ActivityRecordsProvider
    ){}


    /**
     * 
     * 
     * 
     * @memberOf ActivityRecordsPage
     */
    ionViewDidLoad() { 
      console.log('ionViewDidLoad ActivityRecordsPage');
      // this.getActivityRecordsData();
      this.getDrivingRecordsData();
      this.getWalkingRecordsData();
      this.getCyclingRecordsData();
     

    }

   /**
   * @description- Get the token value form sqlLite Storage
   * @author-Emdadul Sadik
   * @type {Promise<any>}
   * @memberOf ActivityRecords
   */

  token:Promise<any> = this.storage.get('token').then((val)=>{
    return this.token = val;
  }).catch( err => console.log(err) );


  /**
  * @description- Change the Footbar to default if token is null
  * @author-Emdadul Sadik
  * @memberOf ActivityRecords
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

  /**
  * @description- Change the Footbar to default if token is null
  * @author-Emdadul Sadik
  * @memberOf ActivityRecords
  */
 getWalkingRecordsData(){
    this.storage.get('userId').then((userId) => {
      this.ActivityRecordsProvider.getWalkingRecords(userId).subscribe(
        data => { 
          for( let item of data){

            item.distance = this.getDistanceFromLatLonInKm(
              item.location.start.lat,
              item.location.start.lng,
              item.location.end.lat,
              item.location.end.lng );

            item.timedelta = new Date(item.end).valueOf() - new Date(item.start).valueOf();

            item.timedelta = this.TimeforHumans( item.timedelta / 1000 );

            this.walkingData.push(item);

          }; 
        },
        error=> console.log('ActivityRecords Fetching Error', error)
      );
    }).catch( err => console.log(err) );

  }

  /**
   * 
   * 
   * 
   * @memberOf ActivityRecordsPage
   */
  getCyclingRecordsData(){
    this.storage.get('userId').then((userId) => {
      this.ActivityRecordsProvider.getCyclingRecords(userId).subscribe(
        data => { 
          for( let item of data){

            item.distance = this.getDistanceFromLatLonInKm(
              item.location.start.lat,
              item.location.start.lng,
              item.location.end.lat,
              item.location.end.lng );

            item.timedelta = new Date(item.end).valueOf() - new Date(item.start).valueOf();

            item.timedelta = this.TimeforHumans( item.timedelta / 1000 );

            this.cyclingData.push(item);

          }; 
        },
        error=> console.log('ActivityRecords Fetching Error', error)
      );
    }).catch( err => console.log(err) );
  }

  /**
   * 
   * 
   * 
   * @memberOf ActivityRecordsPage
   */
  getDrivingRecordsData(){
    this.storage.get('userId').then((userId) => {
      this.ActivityRecordsProvider.getDrivingRecords(userId).subscribe(
        data => { 
          for( let item of data){

            item.distance = this.getDistanceFromLatLonInKm(
              item.location.start.lat,
              item.location.start.lng,
              item.location.end.lat,
              item.location.end.lng );

            item.timedelta = new Date(item.end).valueOf() - new Date(item.start).valueOf();

            item.timedelta = this.TimeforHumans( item.timedelta / 1000 );

            this.drivingData.push(item);

          }; 
        },
        error=> console.log('ActivityRecords Fetching Error', error)
      );
    }).catch( err => console.log(err) );
  }

  /**
  * @description- Change the Footbar to default if token is null
  * @author-Emdadul Sadik
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
      var d = R * c; // Distance in km
      return d;
  }
  /**
  * @description- Change the Footbar to default if token is null
  * @author-Emdadul Sadik
  * @memberOf ActivityRecords
  */
  deg2rad(deg) {
      return deg * (Math.PI/180)
  }


  /**
  * @description- Change the Footbar to default if token is null
  * @author-Emdadul Sadik
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