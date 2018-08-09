import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';
import query from './query/query.gql';

fetch('/graphql', {
  body: JSON.stringify({ query }),
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
})
  .then(response => response.json())
  .then(({ data }) => {
    ReactDOM.render(
      <App data={data.feed.data} />,
      document.getElementById('container')
    );
  })
  .catch(() => console.warn('Could not receive data from the API!'));
