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
