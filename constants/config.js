const {
  PORT = 3000,
  mestoDb = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET = '62d17d125fed2ecdaa09c2e9a0254d2039ad57ef4725ec5c56a5cfb254e90b1f',
} = process.env;

module.exports = {
  PORT,
  mestoDb,
  JWT_SECRET,
};
