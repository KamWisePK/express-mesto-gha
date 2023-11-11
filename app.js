const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '654f58ef9f5be5c236479f49',
  };

  next();
});

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
