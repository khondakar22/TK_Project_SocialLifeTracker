import {
    Location
} from "./location";

export class SetActivity {
    /**
     * Creates an instance of SetActivity.
     * @param {Location} location 
     * @param {string} [startpoint] 
     * @param {string} [activity] 
     * @param {string} [endpoint] 
     * @param {string} [setWalkingUserID] 
     * @param {Date} [start] 
     * @param {Date} [end] 
     * @param {string} [distance] 
     * @param {string} [timedelta] 
     * 
     * @memberOf SetActivity
     */
    constructor(public location: Location,
        public startpoint ? : string,
        public activity ? : string,
        public endpoint ? : string,
        public setWalkingUserID ? : string,
        public start ? : Date,
        public end ? : Date,
        public distance ? : string,
        public timedelta ? : string,
    ) {}
}