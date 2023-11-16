const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const { validateRegister, validateLogin } = require('./validation/userValidation');
const { createUser, login } = require('./controllers/users');

const app = express();
app.use(express.json());

app.use(helmet());

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

app.use(auth);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(userRouter);
app.use(cardRouter);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
