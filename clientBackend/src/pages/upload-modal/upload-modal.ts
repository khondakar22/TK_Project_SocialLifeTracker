import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import {
  ImageUploadProvider
} from '../../providers/image-upload/image-upload';

@IonicPage()
@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {

  imageData: any;
  desc: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private imagesProvider: ImageUploadProvider) {
    this.imageData = this.navParams.get('data');
  }

  saveImage() {
    this.imagesProvider.uploadImage(this.imageData, this.desc).then(res => {
      this.viewCtrl.dismiss({
        reload: true
      });
    }, err => {
      this.dismiss();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
