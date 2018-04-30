import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Http, Response} from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { Location } from "../../models/location";
import { Headers } from '@angular/http';

@Injectable()
export class LocationProvider {
  private locations: Location[] = []; 
  constructor(public http: Http) {
    console.log('Hello LocationProvider Provider');
  }
 // liveUrl = 'https://polar-mountain-79390.herokuapp.com/';
 devUrl = 'http://localhost:5000/';
  	/**
     * [addLocation description] 
     * @author-Khondakar Readul Islam
     * @version 1.0.0 
  	 * @param {Location} location [description]
  	 */
    addLocation(location: Location, id, formatedAddress) {
      const body = JSON.stringify(location);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.devUrl + 'user/' + id+ '/'+ formatedAddress, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
    }

  /**
   * [getLocation description]
   * @author-Khondakar Readul Islam
   * @version 1.0.0 
   * 
   */
  getLocation() {
    return this.http.get(this.devUrl + 'user/allLocation')
      .map((response: Response) => {
        const locations = response.json().obj
        let transformedLocation: Location[] = [];
        for (let location of locations) {
          transformedLocation.push(new Location(
            location.lat,
            location.lng,
            location.formatedAddress,
            location.user.userName,
            location.user.userRole,
            location.user.firstName,
            location.user.lastName,
            location.user.emailAddress,
            location.user.imageURL,
            location.created
          ));
        }
        this.locations = transformedLocation;
        return transformedLocation;
      }).catch((error: Response) => Observable.throw(error.json()));
  }

}
