import dotenv from 'dotenv';
dotenv.config();

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import history from 'connect-history-api-fallback';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const db = mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((conn) => conn.connection.getClient());

import apisRouter from './routes/api.js';

const app = express();

app.use(
    history({
        rewrites: [
            {
                from: /^\/(api)|(account)\/.*$/,
                to: function (context) {
                    return context.parsedUrl.pathname;
                },
            },
        ],
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(resolve(__dirname, '../dist')));
app.use(
    session({
        secret: process.env.SECRET,
        store: MongoStore.create({
            client: db,
        }),
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apisRouter);

export default app;
