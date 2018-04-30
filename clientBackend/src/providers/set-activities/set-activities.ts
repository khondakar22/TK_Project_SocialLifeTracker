import {
  Injectable
} from '@angular/core';
import 'rxjs/Rx';
import {
  Http,
  Response
} from "@angular/http";
import {
  Observable
} from 'rxjs/Rx';
import {
  SetActivity
} from "../../models/setActivites";

import {
  Location
} from "../../models/location";
import {
  Headers
} from '@angular/http';

@Injectable()
export class SetActivitiesProvider {
  private setactivites: SetActivity[] = [];
  // liveUrl = 'https://polar-mountain-79390.herokuapp.com/';
  devUrl = 'http://localhost:5000/';

  private setActivity: SetActivity[] = [];

  constructor(public http: Http) {
    console.log('Hello set Activites Provider');
  }


  /**
   * @description-[]
   * @author-Khondakar Readul Islam
   * @version 0.0.1
   * @param {SetActivity} activityBody 
   * @param {any} id 
   * @returns 
   * 
   * @memberOf SetActivitiesProvider
   */
  setStartActivitiesInfo(activityBody: SetActivity, id,  startpoint,activity) {
    // const mergedBody = new SetActivity(latLng, setActivity); 
    const body = JSON.stringify(activityBody);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.devUrl + 'user/start/' + id+'/'+startpoint+'/'+activity, body, {
        headers: headers
      })
      .map((response: Response) => response.json())
    // .catch((error: Response) => Observable.throw(error.json()));
  }

  /**
   * @description-[]
   * @author-Khondakar Readul Islam
   * @version 0.0.1
   * @param {SetActivity} activityBody 
   * @param {any} id 
   * @returns 
   * 
   * @memberOf SetActivitiesProvider
   */
  setEndActivitiesInfo(activityBody: SetActivity, id, endpoint){

  const body = JSON.stringify(activityBody);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.patch(this.devUrl + 'user/end/' +id+'/'+endpoint, body, {
        headers: headers
      })
      .map((response: Response) => response.json())

  }
  /**
   * @description-[]
   * [getLocation description]
   * I need check whether this method is using or not
   * @author-Khondakar Readul Islam
   * @version 0.0.1
   * 
   */
  getLocation(id) {
    return this.http.get(this.devUrl + 'user/walkinglist/' + id)
      .map((response: Response) => {
        const activities = response.json().obj
        let transformedLocation: SetActivity[] = [];
        for (let activity of activities) {
          transformedLocation.push(new SetActivity(activity.location));
        }
        // this.locations = transformedLocation; 
        return transformedLocation;
      })
    // .catch((error: Response) => Observable.throw(error.json()));
  }



  /**
   * 
   * @description-[]
   * @param {any} id 
   * @returns 
   * @author-Khondakar Readul Islam
   * @version 0.0.1
   * @memberOf SetActivitiesProvider
   */
  getWalkingRecords( id) {    
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.devUrl + 'user/singleWalkingInfo/' + id, {
        headers: headers
    }).map((response: Response) => {  return response.json().obj ; })
  }


  /**
   * 
   * @description-[]
   * @param {any} id 
   * @returns 
   * @author-Khondakar Readul Islam
   * @version 0.0.1
   * @memberOf SetActivitiesProvider
   */
  getCyclingRecords( id) {    
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.devUrl + 'user/singleCyclingInfo/' + id, {
        headers: headers
    }).map((response: Response) => {  return response.json().obj ; })
  }

  /**
   * 
   * @description-[]
   * @param {any} id 
   * @returns 
   * @author-Khondakar Readul Islam
   * @version 0.0.1
   * @memberOf SetActivitiesProvider
   */
  getDrivingRecords( id) {    
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.devUrl + 'user/singleDrivingInfo/' + id, {
        headers: headers
    }).map((response: Response) => {  return response.json().obj ; })
  }

}
