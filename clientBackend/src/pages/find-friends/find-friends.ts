import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { UsertabsPage } from '../usertabs/usertabs';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { NgForm } from '@angular/forms';
import { Location } from '../../models/location';
import { LocationProvider } from '../../providers/location/location';
import { ProfilePage } from '../profile/profile';

declare var google;
@IonicPage()
@Component({
  selector: 'page-find-friends',
  templateUrl: 'find-friends.html',
})
export class FindFriendsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  hide: boolean = false;
  locations: Location[];

 


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
     public storage: Storage,
     public geolocation: Geolocation, 
    public locationService: LocationProvider 
     
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFavouritePlacePage');
    console.log(this.locations);
    this.mapInit();
   this.locationService.getLocation().subscribe((data)=>{
          this.locations = data ; 
          console.log(this.locations);
   })  
  }


  mapInit() {
    this.geolocation.getCurrentPosition().then(
      location => {
        let latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      });
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


userId:Promise<any> = this.storage.get('userId').then((val)=>{
  return this.userId = val; 
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

  onLocateMe(){
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
            var address = (results[0].formatted_address); 
          }
          this.storage.get('userId').then((userId)=>{
            console.log(latLng);
            this.locationService.addLocation(latLng,userId,address).subscribe((data)=>{
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
          let content = `<h5>${address}</h5>`;
          this.addInfoWindow(marker,content); 
        }.bind(this))
      }
    )
  }

  /**
   * @description- Change the Footbar to default if token is null
   * @author-Khondakar Readul Islam
   * @memberOf UserManagementPage
   */
  onLocateFriends() {
    for (var i = 0; i < this.locations.length; ++i) {
      let marker = new google.maps.Marker({
        map:this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng),
      }); 
      var content = `<h5>${this.locations[i].userName}</h5>
                    <p>${ this.locations[i].formatedAddress }  </p>
                    <p>Active Time: ${this.locations[i].created}</p>`;
      this.addInfoWindow(marker, content); 
    }
    this.hide = !this.hide;
    console.log('Hitting')
  }

addInfoWindow(marker, content){
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
  * @param {Location} location 
  * @param {number} index 
  * 
  * @memberOf FindFriendsPage
 */
viewProfile(location: Location, index: number) {
  this.navCtrl.push('ProfilePage', {
    location: location,
    index: index
  });
}


}
