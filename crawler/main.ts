import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import Config from './core/config.js';
import crawlers from './crawlers/index.js';
import captchasolvers from './core/captcha/index.js';
import Uploader from './core/uploader.js';
const __dirname = dirname(fileURLToPath(import.meta.url));

// initialize environment
const config = new Config(resolve(__dirname, 'crawler.yml'));
const captchasolver = new captchasolvers[config.captcha.service](
    config.captcha
);
const uploader = new Uploader(config.user);
await uploader.init();

(async () => {
    for (const name in config.asset) {
        console.log(`Crawling ${name}`);
        const crawler = new crawlers[name](
            name,
            config.asset[name],
            captchasolver
        );
        await uploader.active(crawler);
        const results = await crawler.run();
        console.log(results);
        await uploader.run(results);
    }
})();
