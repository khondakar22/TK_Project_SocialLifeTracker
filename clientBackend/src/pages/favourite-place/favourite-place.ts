import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { AddPlacePage } from '../../pages/add-place/add-place';
import {Place} from "../../models/place";
import {PlaceServiceProvider} from "../../providers/place-service/place-service";
import {PlacePage} from "../../pages/place/place";


@IonicPage()
@Component({
  selector: 'page-favourite-place',
  templateUrl: 'favourite-place.html',
})
export class FavouritePlacePage {

  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(private modalCtrl: ModalController,
              private placesService: PlaceServiceProvider) {

  }

  // ngOnInit() {
  //   this.placesService.fetchPlaces()
  //     .then(
  //       (places: Place[]) => this.places = places
  //     );
  // }

  // ionViewWillEnter() {
  //   this.places = this.placesService.loadPlaces();
  // }

  // onOpenPlace(place: Place, index: number) {
  //   const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
  //   modal.present();
  //   modal.onDidDismiss(
  //     () => {
  //       this.places = this.placesService.loadPlaces();
  //     }
  //   );
  // }

}
