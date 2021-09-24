import yaml from 'yaml';
import { PathLike, existsSync, readFileSync } from 'fs';

export default class Config {
    asset: any;
    captcha: any;
    user: any;
    constructor(file: PathLike) {
        // found config yaml
        if (!existsSync(file)) {
            console.log('Must have crawler.yaml');
            process.exit(1);
        }
        const config = yaml.parse(readFileSync(file, 'utf-8'));
        this.asset = config.Asset;
        this.captcha = config.Captcha;
        this.user = config.User;
    }
}
