import {
  Component,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  TabsPage
} from '../tabs/tabs';
import {
  UsertabsPage
} from '../usertabs/usertabs';
import {
  Storage
} from '@ionic/storage';
import {
  SetActivity
} from "../../models/setActivites";
import {
  Geolocation
} from '@ionic-native/geolocation';
import {
  SetActivitiesProvider
} from '../../providers/set-activities/set-activities';
declare var google;

@IonicPage()
@Component({
  selector: 'page-set-driving',
  templateUrl: 'set-driving.html',
})
export class SetDrivingPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  hide: boolean = false;
  activity : string = "Driving";
  setActivity : SetActivity[] = [];
  lat: any;
  lng: any;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public storage: Storage,
      public geolocation: Geolocation,
      public stActivityProvider: SetActivitiesProvider ) {}

    ionViewDidLoad() {
      console.log('ionViewDidLoad SetWorkingPage');

    }

  /**
   * @description- Get the token value form sqlLite Storage
   * @author- Emdadul Sadik
   * @type {Promise<any>}
   * @memberOf UserManagementPage
   */
  token: Promise < any > = this.storage.get('token').then((val) => {
    return this.token = val;
  }).catch( err => console.log(err) );

  /**
   * @description- Go back to root page if token is valid.
   * @author- Emdadul Sadik
   * @memberOf SetActivity
   */
  goToRootAgain() {
    this.storage.get('token').then((val) => {
      if (val == null) { this.navCtrl.setRoot(TabsPage);} 
      else { this.navCtrl.setRoot(UsertabsPage); }
    })
  }


   /**
   * @description - Get Values from Storage (SQlite IndedDB)
   * @author- Emdadul Sadik
   * @memberOf SetActivity
   */
  userId: Promise < any > = this.storage.get('userId').then((val) => {
    return this.userId = val;
  }).catch( err => console.log(err) );

  setWalkingUserID: Promise < any > = this.storage.get('setWalkingUserID').then((val) => {
    return this.setWalkingUserID = val;
  }).catch( err => console.log(err) );

  setActivities: Promise < any > = this.storage.get('setActivities').then((val) => {
    return this.setActivities = val;
  }).catch( err => console.log(err) );




/**
   * @description- Change the Footbar to default if token is null
   * @author-MD Wazid Ali
   * @memberOf UserManagementPage
   */

  startDriving(){
    this.geolocation.getCurrentPosition().then(
      location => {
        let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var geocoder = new google.maps.Geocoder(); 
        geocoder.geocode({'latLng':latLng},function(results,status){
          if (status !== google.maps.GeocoderStatus.OK){
            console.log(status);
          }
          if(status == google.maps.GeocoderStatus.OK){
            var startpoint = (results[0].formatted_address); 
          }
          var bodyObject = new SetActivity(latLng);
          console.log(latLng.lat);
          this.storage.get('userId').then((userId)=>{
            this.stActivityProvider.setStartActivitiesInfo(bodyObject,userId,startpoint,this.activity).subscribe((data)=>{
              console.log(data);
                this.storage.set('setActivitiesIDForDriving', data.setActivitiesID);
                this.storage.set('setActivities', data.activity);
            },(error)=>{
              console.log(error);
            })
          }).catch((err)=>{
            console.log(err);
          })
          let marker = new google.maps.Marker({
            map:this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
          });
          let content = `<h5>${startpoint}</h5>`;
          this.addInfoWindow(marker,content); 
        }.bind(this))
      }
    )
  }

  

/**
   * @description- Change the Footbar to default if token is null
   * @author-MD Wazid Ali
   * @memberOf UserManagementPage
   */

  endDriving(){
    this.geolocation.getCurrentPosition().then(
      location => {
        let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var geocoder = new google.maps.Geocoder(); 
        geocoder.geocode({'latLng':latLng},function(results,status){
          if (status !== google.maps.GeocoderStatus.OK){
            console.log(status);
          }
          if(status == google.maps.GeocoderStatus.OK){
            var endpoint = (results[0].formatted_address); 
          }
          var bodyObject = new SetActivity(latLng);
          console.log(latLng.lat);
          this.storage.get('setActivitiesIDForDriving').then((setActivitiesIDForDriving)=>{
            this.stActivityProvider.setEndActivitiesInfo(bodyObject,setActivitiesIDForDriving,endpoint).subscribe((data)=>{
              console.log(data);
            },(error)=>{
              console.log(error);
            })
          }).catch((err)=>{
            console.log(err);
          })
          let marker = new google.maps.Marker({
            map:this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
          });
          let content = `<h5>${endpoint}</h5>`;
          this.addInfoWindow(marker,content); 
        }.bind(this))
        this.getDrivingRecordsData();
        this.hide = true;
        // Below Function does not work properly
        //  this.makePolylines();
      }
    )
  }



  /**
   * @description- Change the Footbar to default if token is null
   * @author-Khondakar Readul Islam
   * @memberOf UserManagementPage
   */
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }





  /**
  * @description- Change the Footbar to default if token is null
  * @author-Khondakar Readul Islam
  * @memberOf ActivityRecords
  */
 getDrivingRecordsData(){
  this.storage.get('setActivitiesIDForDriving').then((setActivitiesIDForDriving) => {
    this.stActivityProvider.getDrivingRecords(setActivitiesIDForDriving).subscribe(
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


/**
  * @description- Change the Footbar to default if token is null
  * @author-Khondakar Readul Islam
  * @param {Location} location 
  * @param {number} index 
  * 
  * @memberOf FindFriendsPage
 */
shareActivity(activity: SetActivity, index: number) {
  console.log('We will do')
}


  


}
