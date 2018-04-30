import {  Injectable } from '@angular/core';
import 'rxjs/Rx';
import {  Http, Response } from "@angular/http";
import {  Observable } from 'rxjs/Rx';
import {  SetActivity } from "../../models/setActivites";
import {  Location } from "../../models/location";
import { User } from "../../models/user.model";
import {  Headers } from '@angular/http';


/**
 * 
 * 
 * @export
 * @class ActivityRecordsProvider
 */
@Injectable()
export class ActivityRecordsProvider {

  private setactivites: SetActivity[] = [];

  // liveUrl = 'https://polar-mountain-79390.herokuapp.com/';
  devUrl = 'http://localhost:5000/';

  private setActivity: SetActivity[] = [];

  /**
   * Creates an instance of ActivityRecordsProvider.
   * @param {Http} http 
   * 
   * @memberOf ActivityRecordsProvider
   */
  constructor(public http: Http) {
    console.log('Hello Activity Records Provider');
  }
 /**
   * [Pulling activity records in terms of Friend(user) OR/AND TIME Delta] 
   * @author-Emdadul Sadik
   * @version 1.0.0 
   * @param {Location} location [description]
   */
  getWalkingRecords( id) {    
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.devUrl + 'user/walkinglist/' + id, {
        headers: headers
    }).map((response: Response) => {  return response.json().obj ; })
  }


  /**
   * 
   * 
   * @param {any} id 
   * @returns 
   * 
   * @memberOf ActivityRecordsProvider
   */
  getCyclingRecords( id) {    
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.devUrl + 'user/cyclinglist/' + id, {
        headers: headers
    }).map((response: Response) => {  return response.json().obj ; })
  }


  /**
   * 
   * 
   * @param {any} id 
   * @returns 
   * 
   * @memberOf ActivityRecordsProvider
   */
  getDrivingRecords( id) {    
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.devUrl + 'user/drivinglist/' + id, {
        headers: headers
    }).map((response: Response) => {  return response.json().obj ; })
  }

}
