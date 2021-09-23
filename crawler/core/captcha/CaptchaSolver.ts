import fetch from 'node-fetch';
export default class CaptchaSolver {
    constructor() {}

    async getImage(url) {
        const response = await fetch(url);
        return new Uint8Array(await response.arrayBuffer());
    }

    // declare sove method for image
    async solve(_file) {
        throw 'Need to be Implement';
    }
}
