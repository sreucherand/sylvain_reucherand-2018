/* eslint-disable react/no-danger */
import chalk from 'chalk';
import fs from 'fs-extra';
import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import App from './App/App';
import Html from './Html/Html';
import manifest from '../public/static/manifest.json';
import resolvers from './resolvers/resolvers';
import types from './schema/types';
import query from './query/query.gql';

console.log(`${'\n'}${chalk.bold('— Static files')}`);

const filename = path.resolve('public/index.html');

const schema = makeExecutableSchema({
  resolvers: resolvers,
  typeDefs: types,
});

graphql(schema, query)
  .then(({ data }) => {
    const output = renderToStaticMarkup(
      <Html
        data={JSON.stringify(data.feed.data)}
        css={manifest['app.css']}
        js={manifest['app.js']}
        name="app"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: renderToStaticMarkup(<App data={data.feed.data} />),
          }}
          id="container"
        />
      </Html>
    );

    return fs.writeFile(filename, `<!DOCTYPE html>${output}`);
  })
  .then(() =>
    console.log(
      `  [+] ${chalk.bold(
        `./${path.relative(process.cwd(), filename)}`
      )} ${chalk.bold.green('[build]')}`
    )
  )
  .catch(error => console.warn('Could not generate a static build!', error));
