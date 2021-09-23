import router from './auth';
import Record from '../model/record';
import Crawler from '../model/crawler';
import { ensureAuthenticated } from '../auth/passport';
import { Document } from 'mongoose';
import { assert } from 'console';

router.get('/', function (req, res) {
    res.send('Api server is running');
});

router.get('/active', ensureAuthenticated, function (req:{[key: string]: any}, res: { status: (arg0: number) => void; send: (arg0: Document<any, any, any>[]) => void; }) {
    Crawler.find({},  function (err, crawler) {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.send(crawler);
    })
});

router.post('/active', ensureAuthenticated, function (req: {[key: string]: any}, res: { status: (arg0: number) => void; send: (arg0: string | undefined) => void; }) {
    let { name, ...info } = req.body;
    Crawler.findOneAndUpdate(
        { name: name },
        { $set: info },
        {
            upsert: true,
            new: true,
            runValidators: true,
        },
        function (err, crawler: {[key: string]: any}) {
            if (err) {
                console.log(err);
                res.status(400);
            }
            console.log(`crawler ${crawler['name']} activate`)
        }
    );
    let activeCrawler = new Set(req.user.activeCrawler);
    activeCrawler.add(name);
    req.user.activeCrawler = Array.from(activeCrawler);
    req.user.save()
        .then((success: { activeCrawler: string | undefined; }) => {
            res.send(success.activeCrawler);
        })
        .catch((err: any) => {
            console.log(err);
            res.status(400);
        });
});

router.get('/record', ensureAuthenticated, function (req:{[key: string]: any}, res: { status: (arg0: number) => void; send: (arg0: Document<any, any, any>[]) => void; }) {
    Record.find({ owner: req.user._id }, function (err, records) {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.send(records);
    });
});

router.post('/record', ensureAuthenticated, function (req:{[key: string]: any}, res: { status: (arg0: number) => void; send: (arg0: Document<any, any, any>) => void; }) {
    let { info, ...query } = req.body;
    query.owner = req.user._id;
    Record.findOneAndUpdate(
        query,
        { $set: { info: info } },
        {
            upsert: true,
            new: true,
            runValidators: true,
        },
        function (err, record) {
            if (err) {
                console.log(err);
                res.status(400);
            }
            res.send(record);
        }
    );
});

export default router;
