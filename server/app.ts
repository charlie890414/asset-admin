import dotenv from 'dotenv';
dotenv.config();

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import express from 'express';
const cookieParser = require('cookie-parser'); ;
import logger from 'morgan';
const history = require('connect-history-api-fallback');
const passport = require('passport');
const session = require('express-session');
import MongoStore from 'connect-mongo';
const mongoose = require('mongoose');

const db = mongoose
    .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((conn: { connection: { getClient: () => any; }; }) => conn.connection.getClient());

import apisRouter from './routes/api';

const app = express();

app.use(
    history({
        rewrites: [
            {
                from: /^\/(api)|(account)\/.*$/,
                to: function (context: { parsedUrl: { pathname: any; }; }) {
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
