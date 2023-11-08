const errorName = {
  ok: 'Успешно',
  created: 'Создано',
  badRequest: ' переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля',
  notFound: 'карточка или пользователь не найден',
  serverError: 'ошибка по-умолчанию',
};

const errorCode = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  serverError: 500,
};

module.exports = { errorCode, errorName };
