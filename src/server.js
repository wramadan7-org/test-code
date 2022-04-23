const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const logger = require('./config/logger');
const routeV1 = require('./routes/index');

const app = express();

const {
  PORT,
} = process.env;

mongoose.connect('mongodb+srv://wramadan:g7bebSiSWyIZtaP6@cluster0.wbnuo.mongodb.net/test-code?authSource=MONGODB&authMechanism=SCRAM-SHA-1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (error, db) => {
  if (error) {
    logger.info(`Connecting to database error: ${error.message}`);
    throw error;
  }
  app.listen(PORT, () => {
    logger.info(`App working on ${PORT}`);
  });
  // db.close();
});

// set response wrapper
app.response.sendWrapped = function (data, statusCode = httpStatus.OK, paginator) {
  if (data && data !== '') {
    return this.status(statusCode).send({
      status: statusCode,
      data,
    });
  }

  return this.status(statusCode).send({
    status: statusCode,
    ...paginator,
  });
};

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/v1', routeV1);

module.exports = app;
