import SinopacStock from './SinopacStock';
import SinopacBank from './SinopacBank';
import ChunghwaPost from './ChunghwaPost';
import BaseCrawler from './BaseCrawler';

let crawlerTypes: {
    [key: string]: (arg0: any, arg1: any, arg2: any) => BaseCrawler;
} = {
    SinopacStock: (name: any, prarm: { idnumber: any; account: any; password: any; headless: any; }) => new SinopacStock(name, prarm),
    SinopacBank: (name: any, prarm: { idnumber: any; account: any; password: any; headless: any; }, captchasolver: any) => new SinopacBank(name, prarm, captchasolver),
    ChunghwaPost: (name: any, prarm: { idnumber: any; account: any; password: any; headless: any; }, captchasolver: any) => new ChunghwaPost(name, prarm, captchasolver),
};

export default crawlerTypes;
