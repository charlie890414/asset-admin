import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import Config from './core/config';
import crawlers from './crawlers/index';
import captchasolvers from './core/captcha/index';
import Uploader from './core/uploader';
import TrueCaptcha from './core/captcha/TrueCaptcha';
const __dirname = dirname(fileURLToPath(import.meta.url));

// initialize environment
const config: {
    user: {
        api_endpoint: any;
        email: any;
        password: any;
    }
    asset: string[];
    captcha: { service: string, userid: string; apikey: string; mode: string; };
} = new Config(resolve(__dirname, 'crawler.yml'));
const captchasolver = captchasolvers[config.captcha.service](
    config.captcha
);
const uploader = new Uploader(config.user);
await uploader.init();

(async () => {
    for (const name in config.asset) {
        console.log(`Crawling ${name}`);
        const crawler: {
            name: any;
            type: any;
            signin_url: any;
            run(): Promise<{
                name: any;
                type: string;
                date: string;
                info: {}[];
            }>;
        } = crawlers[name](
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
