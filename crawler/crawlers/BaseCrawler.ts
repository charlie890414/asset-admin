import assert from 'assert';
import puppeteer from 'puppeteer-extra';

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

export default class BaseCrawleer {
    name: any;
    browser: any;
    headless: any;
    page: any;
    constructor(name: any) {
        this.name = name;
    }

    async init() {
        this.browser = await puppeteer.launch({ headless: this.headless });
        this.page = await this.browser.newPage();
        this.page.setViewport({
            width: 1000,
            height: 600,
            deviceScaleFactor: 1,
        });
        // tricks to hide puppeteer
        await this.page.evaluateOnNewDocument(
            "() => {Object.defineProperty(navigator, 'webdriver', {get: () => undefined})}"
        );
    }

    async goto(url: string) {
        // consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
        await this.page.goto(url, { waitUntil: 'networkidle2' });
    }

    async exit() {
        await this.browser.close();
    }

    async getResourceTree() {
        var resource = await this.page._client.send('Page.getResourceTree');
        return resource.frameTree;
    }

    async getResourceContent(url: any) {
        const { content, base64Encoded } = await this.page._client.send(
            'Page.getResourceContent',
            { frameId: String(this.page.mainFrame()._id), url }
        );
        assert.equal(base64Encoded, true);
        return content;
    }

    async clickByJS(selector: string) {
        await this.page.evaluate(
            (selector: any) => document.querySelector(selector).click(),
            selector
        );
    }

    async run() {
        await this.init();
        let results = {};
        try {
            results = await this.action();
        } catch (error) {}
        await this.exit();
        return this.cleanData(results);
    }

    async cleanData(data: {}) {
        throw 'Need to be Implement';
    }

    // declare action for web page
    async action() {
        throw 'Need to be Implement';
    }
}
