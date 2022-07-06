// const express = require('express');
// const monogoose = require('mogoose');
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
require('dotenv').config();

import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';

const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('C======8 Database connected successeful 8======D');
  })
  .catch((err) => {
    console.log("Database don't connected :'(", err);
  });

// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/', authRouter);
app.use('/', usersRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
