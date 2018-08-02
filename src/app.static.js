/* eslint-disable react/no-danger */
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import Prismic from 'prismic-javascript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

import manifest from '../public/static/manifest.json';
import Html from './Html/Html';
import App from './App/App';

console.log(`${'\n'}${chalk.bold('— Static files')}`);

const filename = path.resolve('public/index.html');

Prismic
  .getApi(API_ENDPOINT, {accessToken: ACCESS_TOKEN})
  .then(api => Promise.all([
    api.getSingle('feed'),
    api.query(Prismic.Predicates.any('document.type', ['news', 'project'])),
  ]))
  .then(([feed, {results}]) => {
    const output = renderToStaticMarkup(
      <Html
        css={manifest['app.css']}
        js={manifest['app.js']}
        name="app"
      >
        <div
          dangerouslySetInnerHTML={{__html: renderToStaticMarkup(<App feed={feed} posts={results} />)}}
          id="container"
        />
      </Html>
    );

    return fs.writeFile(filename, `<!DOCTYPE html>${output}`);
  })
  .then(() => console.log(`  [+] ${chalk.bold(`./${path.relative(process.cwd(), filename)}`)} ${chalk.bold.green('[build]')}`))
  .catch(error => console.warn('Could not generate a static build!', error));
