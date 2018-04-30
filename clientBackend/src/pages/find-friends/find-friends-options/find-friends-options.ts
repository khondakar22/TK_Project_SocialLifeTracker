import { Component } from "@angular/core"; 
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-find-friends-options',
    template: `
           <ion-grid text-center>
            <ion-row>
                    <ion-col>
                            <h3> Find Location </h3>
                    </ion-col>
            </ion-row>
            <ion-row>
                    <ion-col>
                            <button ion-button outline (click)="findOwn()"> Find your location </button>
                    </ion-col>
                    
            </ion-row>        

           


           </ion-grid> 

    `
})
export class FindFriendsOptionsPage{

    constructor (public viewCtrl: ViewController)   {

    } 
    
    
    
    findOwn(){

        }
}