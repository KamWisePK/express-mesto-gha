const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/users');

const app = express();
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(userRouter);
app.use(cardRouter);

app.use(helmet());

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
