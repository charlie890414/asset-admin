import { tmpdir } from 'os';
import { writeFileSync } from 'fs';
import { getExchangeRate } from '../core/currency.js';
import BaseCrawleer from './BaseCrawler.js';
import moment from 'moment';

export default class SinopacBank extends BaseCrawleer {
    type = 'cash';
    signin_url =
        'https://mma.sinopac.com/MemberPortal/Member/NextWebLogin.aspx';
    data_url =
        'https://mma.sinopac.com/mma/mymma/myasset/mma_assets_summary.aspx';

    constructor(name, prarm, captchasolver) {
        super(name);
        this.idnumber = prarm.idnumber;
        this.account = prarm.account;
        this.password = prarm.password;
        this.headless = prarm.headless;
        this.captchasolver = captchasolver;
    }

    async cleanData(rawdata) {
        let cleanrawData = {
            name: this.name,
            type: this.type,
            date: moment().format('YYYY-MM-DD'),
            info: [],
        };
        for (let data of rawdata) {
            let cleanData = {
                name: data['帳號'],
                currency: data['幣別'].match(/[A-Z]+/i)[0],
                exchange: await getExchangeRate(
                    data['幣別'].match(/[A-Z]+/i)[0],
                    'TWD'
                ),
                amount: parseInt(data['餘額'].replace(',', '')),
            };
            cleanrawData['info'].push(cleanData);
        }
        return cleanrawData;
    }

    async action() {
        await this.goto(this.signin_url);
        await this.page.waitForTimeout(1000);
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
        await this.page.type(
            '[placeholder="身分證字號(統一編號)"]',
            this.idnumber
        );
        await this.page.type('[placeholder="使用者代碼"]', this.account);
        await this.page.type('[placeholder="網路密碼"]', this.password);
        const imgCode = await this.page.$eval('#imgCode', (i) => i.src);
        const content = await this.getResourceContent(imgCode);
        const contentBuffer = Buffer.from(content, 'base64');
        writeFileSync(tmpdir() + '/imgcode.png', contentBuffer, 'base64');
        const answer = await this.captchasolver.solve(
            tmpdir() + '/imgcode.png'
        );
        await this.page.type('[placeholder="驗證碼"]', answer);
        await this.page.waitForTimeout(1000);
        await this.clickByJS('#MMA_Login');
        await this.page.waitForTimeout(1000);

        await this.goto(this.data_url);
        await this.page.waitForTimeout(1000);
        const headers = await this.page.$$eval(
            '.overview table tr th',
            (elements) => elements.map((element) => element.textContent)
        );
        const results = [];
        const raws = await this.page.$$('.overview table tr:nth-child(n+2)');
        for (let i = 0; i < raws.length; i++) {
            const raw = await raws[i].$$eval('td', (elements) =>
                elements.map((element) => element.textContent)
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
