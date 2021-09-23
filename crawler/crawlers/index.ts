import SinopacStock from './SinopacStock';
import SinopacBank from './SinopacBank';
import ChunghwaPost from './ChunghwaPost';
import BaseCrawler from './BaseCrawler';

let crawlerTypes: {
    [key: string]: typeof BaseCrawler;
} = {
    SinopacStock: SinopacStock,
    SinopacBank: SinopacBank,
    ChunghwaPost: ChunghwaPost,
};

export default crawlerTypes;
