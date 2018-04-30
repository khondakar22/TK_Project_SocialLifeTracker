import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import {
  UsertabsPage
} from '../usertabs/usertabs';
import {
  Storage
} from '@ionic/storage';
import {
  TabsPage
} from '../tabs/tabs';
import {
  NgForm
} from "@angular/forms";

import {
  Location
} from "../../models/location";
import {
  Geolocation
} from '@ionic-native/geolocation';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera';
import {
  PlaceServiceProvider
} from "../../providers/place-service/place-service";
import {
  File,
  /*Entry, FileError*/
} from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';
  constructor(public navCtrl: NavController,

    public navParams: NavParams,
    public storage: Storage,
    private geolocation: Geolocation,
    private loadingCtr: LoadingController,
    private toastCtr: ToastController,
    private camera: Camera,
    private placesService: PlaceServiceProvider,
    private file: File) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }




  // onSubmit(form: NgForm) {
  //   this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
  //   form.reset();
  //   this.location = {
  //     lat: 40.7624324,
  //     lng: -73.9759827
  //   };
  //   this.imageUrl = '';
  //   this.locationIsSet = false;

  // }



  onLocate() {
    console.log('Checking');
    const loader = this.loadingCtr.create({
      content: 'Getting your Location..'
    });
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          console.log(location);
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch((error) => {
        loader.dismiss();
        const toast = this.toastCtr.create({
          message: 'Could get location, please pick it manually! ',
          duration: 2500
        });
        toast.present();
        console.log('Error getting location', error);
      });
  }



  onTakePhoto() {


    const options: CameraOptions = {
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }


    this.camera.getPicture(options)
      .then((imageData) => {

        //const Image64data = 'data:image/jpeg;base64,' + imageData;
        /* const currentName = imageData.replace(/^.*[\\\/]/,'');
             const path = imageData.replace(/[^\/]*$/,'');
             const newFileName = new Date().getUTCMilliseconds() + '.jpg';
             console.log("Name, path", path,"+", currentName);
             this.file.moveFile(path, currentName, this.file.dataDirectory, newFileName)
        .then(
          data =>{
           
            this.imageUrl = data.nativeURL; 
             console.log(data);
            this.camera.cleanup(); 
            this.file.removeFile(path,currentName);
          }

          )
        .catch(
          err=>{
            console.log(err);
            this.imageUrl = '';
            const toast = this.toastCtr.create({
              message:'Could Not save the image. Please try again',
              duration:2500
            });
            toast.present();
            this.camera.cleanup();
          }
         

          );*/
        ///Ned 
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageUrl = base64Image;

      }, (err) => {
        const toast = this.toastCtr.create({
          message: 'Could Not save the image. Please try again',
          duration: 2500
        });
        toast.present();
        this.camera.cleanup();
      });

  }



}
