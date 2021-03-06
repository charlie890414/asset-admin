import { readFileSync } from 'fs';
import validator from 'validator';
import fetch from 'node-fetch';
import CaptchaSolver from './CaptchaSolver.js';

export default class TrueCaptcha extends CaptchaSolver {
    constructor(prarm) {
        super();
        this.userid = prarm.userid;
        this.apikey = prarm.apikey;
        this.mode = prarm.mode;
    }

    async base64encode(file) {
        let bitmap = new Uint8Array();
        if (validator.isURL(file, { require_protocol: true })) {
            // read from url
            bitmap = await this.getImage(file);
        } else if (typeof file === 'string') {
            // read binary data
            bitmap = readFileSync(file);
        }
        return Buffer.from(bitmap).toString('base64');
    }

    async solve(file) {
        // copy from truecaptcha.com
        const base64str = await this.base64encode(file);
        const b64 = base64str.replace(
            /^data:image\/(png|jpeg|jpg|gif);base64,/,
            ''
        );
        const url = 'https://api.apitruecaptcha.org/one/gettext';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.userid,
                apikey: this.apikey,
                data: b64,
                mode: this.mode,
            }),
        });

        return (await response.json())['result'];
    }
}
