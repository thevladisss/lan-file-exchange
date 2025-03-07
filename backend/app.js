const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');

const networkRouter = require('./routes/network.route');
const uploadRouter = require('./routes/upload.route');
const chatRouter = require('./routes/chat.route');
const userRouter = require('./routes/user.route');

const ping = require('net-ping');
const fs = require('node:fs');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
    secret: process.env.SESSION_SECRET || 'secret',
  }),
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/network', networkRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/chats', chatRouter);
app.use('/api/users', userRouter);

const subnet = '192.168.1'; // Adjust based on your network
const start = 1;
const end = 254;
const _session = ping.createSession();

module.exports = app;
