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
export class TimelineProvider {

   // liveUrl = 'https://polar-mountain-79390.herokuapp.com/';
   devUrl = 'http://localhost:5000/';

  constructor(public http: Http) {
    console.log('Hello TimelineProvider Provider');
  }


    /**
   * [getLocation description]
   * @author-Khondakar Readul Islam
   * @version 1.0.0 
   * 
   */
  getActivityForTimeline(id){
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.devUrl + 'user/userTimeline/' + id, {
        headers: headers
    }).map((response: Response) => {  return response.json().obj ; })
  }

   
}
