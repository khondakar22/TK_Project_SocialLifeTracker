export class User {
    /**
     * Creates an instance of User.
     * @param {string} userName 
     * @param {string} userRole 
     * @param {string} emailAddress 
     * @param {string} password 
     * @param {string} [firstName] 
     * @param {string} [lastName] 
     * 
     * @memberOf User
     */
    constructor(

        public userName: string,
        public userRole: string,
        public emailAddress: string,
        public password: string,
        public firstName ? : string,
        public lastName ? : string,

    ) {}
}