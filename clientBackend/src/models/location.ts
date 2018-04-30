export class Location {
	/**
	 * Creates an instance of Location.
	 * @param {number} lat 
	 * @param {number} lng 
	 * @param {string} [formatedAddress] 
	 * @param {string} [userName] 
	 * @param {string} [userRole] 
	 * @param {string} [firstName] 
	 * @param {string} [lastName] 
	 * @param {string} [emailAddress] 
	 * @param {string} [imageURL] 
	 * @param {Date} [created] 
	 * 
	 * @memberOf Location
	 */
	constructor(

		public lat: number,
		public lng: number,
		public formatedAddress ? : string,
		public userName ? : string,
		public userRole ? : string,
		public firstName ? : string,
		public lastName ? : string,
		public emailAddress ? : string,
		public imageURL ? : string,
		public created ? : Date) {

	}
}