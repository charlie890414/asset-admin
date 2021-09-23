import fetch, { Headers } from 'node-fetch';
export default class Uploader {
    constructor(user) {
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
    async active(crawler) {
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
            .catch((error) => console.log('error', error));
    }

    async run(rawdata) {
        this.headers.append('Content-Type', 'application/json');
        let requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(rawdata),
        };

        await fetch(`${this.api}/api/record`, requestOptions)
            .catch((error) => console.log('error', error));
    }
}
