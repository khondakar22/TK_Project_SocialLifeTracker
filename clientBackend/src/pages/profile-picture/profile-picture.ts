import {
  Component
} from '@angular/core';
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
  HttpClient
} from '@angular/common/http';
import {
  ImageUploadProvider
} from '../../providers/image-upload/image-upload';
import {
  IonicPage,
  NavController,
  ModalController,
  ActionSheetController
} from 'ionic-angular';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile-picture',
  templateUrl: 'profile-picture.html',
})
export class ProfilePicturePage {

  images: any = [];

  constructor(public navCtrl: NavController,
    private imagesProvider: ImageUploadProvider,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    public storage: Storage, ) {
    this.reloadImages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
   
    // console.log(this.dataInicial);
    this.reloadImages();
  }

  reloadImages() {
    this.imagesProvider.getImages().subscribe(data => {
      this.images = data;
      console.log(data);
    });
  }

  deleteImage(img) {
    this.imagesProvider.deleteImage(img).subscribe(data => {
      this.reloadImages();
    });
  }

  openImage(img) {
    let modal = this.modalCtrl.create('PreviewModalPage', {
      img: img
    });
    modal.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [{
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,

    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      let modal = this.modalCtrl.create('UploadModalPage', {
        // data: imagePath
         data: 'data:image/jpeg;base64,' + imagePath
      });
      modal.present();
      modal.onDidDismiss(data => {
        if (data && data.reload) {
          this.reloadImages();
        }
      });
    }, (err) => {
      console.log('Error: ', err);
    });
  }
  /**
   * @description- Get the token value form sqlLite Storage
   * @author-Khondakar Readul Islam
   * @type {Promise<any>}
   * @memberOf UserManagementPage
   */
  token: Promise < any > = this.storage.get('token').then((val) => {
    return this.token = val;
  }).catch(
    (err) => {
      console.log(err);
    }
  )


  /**
   * @description- Change the Footbar to default if token is null
   * @author-Khondakar Readul Islam
   * @memberOf UserManagementPage
   */
  goToRootAgain() {
    this.storage.get('token').then((val) => {
      if (val == null) {
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.navCtrl.setRoot(UsertabsPage);
      }
    })
  }

}
