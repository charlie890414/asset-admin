const fetch = require('node-fetch');
const Headers = require('node-fetch').Headers;
export default class Uploader {
    api: any;
    email: any;
    password: any;
    headers: any;
    constructor(user: { api_endpoint: any; email: any; password: any; }) {
        this.api = user.api_endpoint;
        this.email = user.email;
        this.password = user.password;
        this.headers = new Headers();
    }

    async init() {
        var urlencoded = new URLSearchParams();
        urlencoded.append('email', this.email);
        urlencoded.append('password', this.password);

        var requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: urlencoded,
        };

        const response = await fetch(`${this.api}/api/auth`, requestOptions);
        this.headers.append('Cookie', response.headers.raw()['set-cookie']);
    }

    // TODO hide this function to server side
    async active(crawler: { name: any; type: any; signin_url: any; }) {
        this.headers.append('Content-Type', 'application/json');

        var requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: crawler.name,
                type: crawler.type,
                website: crawler.signin_url,
            }),
        };

        return await fetch(`${this.api}/api/active`, requestOptions)
            .catch((error: any) => console.log('error', error));
    }

    async run(rawdata: any) {
        this.headers.append('Content-Type', 'application/json');
        let requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(rawdata),
        };

        await fetch(`${this.api}/api/record`, requestOptions)
            .catch((error: any) => console.log('error', error));
    }
}
