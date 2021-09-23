import router from './auth.js';
import Record from '../model/record.js';
import Crawler from '../model/crawler.js';
import { ensureAuthenticated } from '../auth/passport.js';

router.get('/', function (req, res) {
    res.send('Api server is running');
});

router.get('/active', ensureAuthenticated, function (req, res) {
    Crawler.find({},  function (err, crawler) {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.send(crawler);
    })
});

router.post('/active', ensureAuthenticated, function (req, res) {
    let { name, ...info } = req.body;
    Crawler.findOneAndUpdate(
        { name: name },
        { $set: info },
        {
            upsert: true,
            new: true,
            runValidators: true,
        },
        function (err, crawler) {
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
    req.user
        .save()
        .then((success) => {
            res.send(success.activeCrawler);
        })
        .catch((err) => {
            console.log(err);
            res.status(400);
        });
});

router.get('/record', ensureAuthenticated, function (req, res) {
    Record.find({ owner: req.user._id }, function (err, records) {
        if (err) {
            console.log(err);
            res.status(400);
        }
        res.send(records);
    });
});

router.post('/record', ensureAuthenticated, function (req, res) {
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
