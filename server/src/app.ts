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

const app = express();

require('dotenv').config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log('C======8 Database connected successeful 8======D');
  })
  .catch((err) => {
    console.log("Database don't connected :'(");
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is runnint on port ${PORT}`);
});
