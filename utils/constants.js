const errorName = {
  ok: 'Успешно',
  created: 'Создано',
  badRequest: 'Переданы некорректные данные',
  notFound: 'Объект с указанным ID не найден',
  serverError: 'Ошибка на сервере',
};

const errorCode = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  serverError: 500,
};

module.exports = { errorCode, errorName };
