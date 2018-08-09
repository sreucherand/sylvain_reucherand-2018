const Prismic = require('prismic-javascript');

const getAPI = () =>
  Prismic.api(process.env.API_ENDPOINT, {
    accessToken: process.env.ACCESS_TOKEN,
  });

module.exports.fetchFeed = () => getAPI().then(api => api.getSingle('feed'));
module.exports.fetchDocument = id => getAPI().then(api => api.getByID(id));
