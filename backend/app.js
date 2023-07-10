const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/notFoundError');
const defaultError = require('./middlewares/defaultError');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { validatesignin, validatesignup } = require('./middlewares/validate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());

mongoose.connect(DB_URL);

app.use('/signin', validatesignin, login);
app.use('/signup', validatesignup, createUser);
app.use(auth);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(defaultError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
