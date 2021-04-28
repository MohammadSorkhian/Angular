import { Data } from "@angular/router";

export class User {

    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Data
    ) { }

    get token() {
        if (!this._tokenExpirationDate || this._tokenExpirationDate < new Date()) {
            return null;
        } else {
            return this._token;
        }
    }
}