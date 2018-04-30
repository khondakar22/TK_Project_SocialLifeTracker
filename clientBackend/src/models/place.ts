import {
    Location
} from './location';

export class Place {

    /**
     * Creates an instance of Place.
     * @param {string} title 
     * @param {string} description 
     * @param {Location} location 
     * @param {string} imagePath 
     * 
     * @memberOf Place
     */
    constructor(public title: string,
        public description: string,
        public location: Location,
        public imagePath: string) {}
}