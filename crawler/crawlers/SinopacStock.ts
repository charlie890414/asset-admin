import BaseCrawleer from './BaseCrawler.js';
import moment from 'moment';

export default class SinopacStock extends BaseCrawleer {
    type = 'stock';
    signin_url = 'https://www.sinotrade.com.tw/newweb/';
    data_url = 'https://www.sinotrade.com.tw/inside/TradingAccount';
    account: any;
    password: any;

    constructor(name: any, prarm: { account: any; password: any; headless: any; }) {
        super(name);
        this.account = prarm.account;
        this.password = prarm.password;
        this.headless = prarm.headless;
    }

    async cleanData(rawdata: any): Promise<{
        name: any;
        type: string;
        date: string;
        info: {
            name: any;
            currency: string;
            currentPrice: number;
            cost: number;
            amount: number;
        }[];
    }> {
        let cleanrawData :{
            name: any;
            type: string;
            date: string;
            info: {
                name: any;
                currency: string;
                currentPrice: number;
                cost: number;
                amount: number;
            }[];
        } = {
            name: this.name,
            type: this.type,
            date: moment().format('YYYY-MM-DD'),
            info: [],
        };
        for (let data of rawdata) {
            let cleanData = {
                name: data['商品'],
                currency: 'TWD',
                currentPrice: parseFloat(data['現價'].replace(',', '')),
                cost: parseFloat(data['成本'].replace(',', '')),
                amount: parseInt(data['今餘'].replace(',', '')),
            };
            cleanrawData['info'].push(cleanData);
        }
        return cleanrawData;
    }

    async action() {
        await this.goto(this.signin_url);
        const loginbtn = await this.page.waitForSelector(
            '#__next > header > div > div.jsx-689194359.callToAction__container > a.jsx-4041300373.header__btn'
        );
        loginbtn.click();
        await this.page.waitForTimeout(1000);
        await this.page.type('#complex-form_account', this.account);
        await this.page.waitForTimeout(1000);
        await this.page.type('#complex-form_password', this.password);
        await this.page.waitForTimeout(1000);
        await this.page.click('[type="submit"]');
        await this.page.waitForTimeout(1000);

        await this.goto(this.data_url);
        await this.page.waitForTimeout(1000);
        const stockbtn = await this.page.waitForSelector('[href="#tabs-2"]');
        stockbtn.click();
        await this.page.waitForTimeout(1000);
        const headers: string[] = await this.page.$$eval('table tr th', (elements: any[]) =>
            elements.map((element: { textContent: any; }) => element.textContent)
        );
        const results = [];
        const raws = await this.page.$$('table tr:nth-last-child(n+2)');
        for (let i = 0; i < raws.length; i++) {
            const raw = await raws[i].$$eval('td', (elements: any[]) =>
                elements.map((element: { textContent: any; }) => element.textContent)
            );
            const result:{[key: string]: any}  = {};
            for (let j = 0; j < headers.length; j++) {
                result[headers[j]] = raw[j];
            }
            results.push(result);
        }
        return results;
    }
}
