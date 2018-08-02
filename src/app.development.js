import Prismic from 'prismic-javascript';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';

Prismic.getApi(API_ENDPOINT, { accessToken: ACCESS_TOKEN })
  .then(api =>
    Promise.all([
      api.getSingle('feed'),
      api.query(Prismic.Predicates.any('document.type', ['news', 'project'])),
    ])
  )
  .then(([feed, { results }]) => {
    ReactDOM.render(
      <App feed={feed} posts={results} />,
      document.getElementById('container')
    );
  })
  .catch(() => console.warn('Could not receive data from the API!'));
