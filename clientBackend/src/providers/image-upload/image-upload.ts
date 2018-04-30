import {
  Injectable
} from '@angular/core';
import 'rxjs/add/operator/map';
import {
  RequestOptions,
  Http,
  Headers
} from '@angular/http';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@ionic-native/file-transfer';

import { Storage } from '@ionic/storage';

@Injectable()
export class ImageUploadProvider {

  // 
  constructor(public http: Http, private transfer: FileTransfer,  private storage: Storage) {}

  // liveUrl = 'https://polar-mountain-79390.herokuapp.com/';
  devUrl = 'http://localhost:5000/user/';
 
  getImages() {
    return this.http.get(this.devUrl + 'fetchimages').map(res => res.json());
  }
 
  deleteImage(img) {
    return this.http.delete(this.devUrl + 'fetchimages/' + img._id);
  }
 
  uploadImage(img, desc) {
 
    // Destination URL
    let url = this.devUrl + 'upload';
    console.log(url);
 
    // File for Upload
    var fileUrl = img;
    var trustAllHosts = true; 
    var headers = new Headers();
       headers.append('Accept', 'application/json');
     //headers.append('Authorization' , 'Bearer '+this.globalvars.getToken());
     //headers.append('Content-Type', 'multipart/form-data');
    let options = new RequestOptions({ headers: headers});
    let formData = new FormData();

    this.storage.get('userId').then((userId)=>{

      formData.append('userId',userId); 

    });

      formData.append('file', fileUrl);
   //formData.append('userId', ''+MyApp.token);
      //formData.append('filename', fileUrl);
     formData.append('desc', desc);


     return new Promise(resolve => {
              return this.http.post('http://localhost:5000/user/upload', formData, options)
                .subscribe(
                  response  => {
                    resolve(response+" Uploaded Successfully")
                    console.log(response) 
                  },
                  error =>  {console.log(error) }
                );
            });
 
    
  }

}
