import moment from 'moment';
import BaseCrawleer from './BaseCrawler.js';
import os from 'os';

export default class ChunghwaPost extends BaseCrawleer {
    type = 'cash';
    signin_url = 'https://ipost.post.gov.tw/pst/home.html';
    data_url = 'https://ipost.post.gov.tw/pst/index.html';
    idnumber: any;
    account: any;
    password: any;
    captchasolver: any;

    constructor(name: any, prarm: { idnumber: any; account: any; password: any; headless: any; }, captchasolver: any) {
        super(name);
        this.idnumber = prarm.idnumber;
        this.account = prarm.account;
        this.password = prarm.password;
        this.headless = prarm.headless;
        this.captchasolver = captchasolver;
    }

    async cleanData(rawdata: {}) {
        let cleanrawData = {
            name: this.name,
            type: this.type,
            date: moment().format('YYYY-MM-DD'),
            info: [],
        };
        for (let data of rawdata) {
            let cleanData = {
                name: data['我的帳戶'],
                currency:'TWD',
                exchange: 1,
                amount: parseInt(data['餘　　　額'].replace(',', '')),
            };
            cleanrawData['info'].push(cleanData);
        }
        return cleanrawData;
    }

    async action() {
        await this.goto(this.signin_url);
        await this.page.waitForTimeout(1000);
        await this.page.click('#modal > div.ngdialog-buttons > button');
        await this.page.waitForTimeout(1000);
        await this.page.click('[href="#tab1"]');
        await this.page.waitForTimeout(1000);
        await this.page.type('[ng-model="cif_id"]', this.idnumber);
        await this.page.type('[ng-model="userID"]', this.account);
        await this.page.type('[ng-model="userPWD"]', this.password);
        const imgCode = await this.page.$('#tab1 > div.codes_img > img');
        const bound = await imgCode.boundingBox();
        await this.page.screenshot({
            path: os.tmpdir() + '/imgcode.png',
            clip: bound,
        });
        const answer = await this.captchasolver.solve(
            os.tmpdir() + '/imgcode.png'
        );
        await this.page.type('[name="captcha"]', answer);
        await this.page.waitForTimeout(1000);
        await this.page.click('.loginbtn > a');
        await this.page.waitForTimeout(5000);

        await this.goto(this.data_url);
        await this.page.waitForTimeout(1000);
        const headers = await this.page.$$eval(
            'html > body > div > div:nth-of-type(4) > div:nth-of-type(3) > div > div > div > ng-include > div > div:first-of-type > div > div:nth-of-type(3) > div > div:first-of-type > div',
            (elements: any[]) => elements.map((element: { textContent: any; }) => element.textContent)
        );
        const results = [];
        const raws = await this.page.$$(
            'html > body > div > div:nth-of-type(4) > div:nth-of-type(3) > div > div > div > ng-include > div > div:first-of-type > div > div:nth-of-type(3) > div > div:nth-child(n+2)'
        );
        for (let i = 0; i < raws.length; i++) {
            const raw = await raws[i].$$eval('div', (elements: any[]) =>
                elements.map((element: { textContent: any; }) => element.textContent)
            );
            const result = {};
            for (let j = 0; j < headers.length; j++) {
                result[headers[j]] = raw[j];
            }
            results.push(result);
        }
        return results;
    }
}
