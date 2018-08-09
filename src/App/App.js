import classnames from 'classnames';
import dateformat from 'dateformat';
import 'normalize.css/normalize.css';
import { object } from 'prop-types';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { caption } from '../typography/caption.css';
import Gallery from '../Gallery/Gallery';
import grid from '../grid/grid.css';
import { headline } from '../typography/headline.css';
import styles from './app.css';

const App = ({ data }) => (
  <div>
    <Helmet>
      <title>{data.title.text}</title>
      <meta name="description" content={data.description.text} />

      <meta property="og:title" content={data.title.text} />
      <meta property="og:image" content={''} />
      <meta property="og:url" content={data.url.url} />
      <meta property="og:site-name" content={data.title.text} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={data.twitter} />
      <meta name="twitter:creator" content={data.twitter} />
      <meta name="twitter:title" content={data.title.text} />
      <meta name="twitter:description" content={data.description.text} />
      <meta name="twitter:image:src" content={''} />
    </Helmet>

    <div className={caption} id={styles.title}>
      <div className={grid.grid}>
        <div className={grid.row}>
          <div className={classnames(grid.column, grid.column__default8)}>
            <h1>Sylvain Reucherand</h1>
            <div>Developer</div>

            <div>
              <a href="mailto:hello@sylvainreucherand.fr">Say hi!</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id={styles.recent}>
      <div className={grid.grid}>
        {data.posts.map(post => {
          switch (post.type) {
            case 'news':
              return (
                <Fragment key={post.id}>
                  <div className={classnames(grid.row, caption, styles.date)}>
                    <div
                      className={classnames(
                        grid.column,
                        grid.column__default2,
                        grid.column__sm2,
                        grid.column__smOffset2
                      )}
                    >
                      <div>{dateformat(post.data.date, 'mmm yyyy', true)}</div>
                    </div>
                  </div>

                  <div className={classnames(grid.row, styles.post)}>
                    <div
                      className={classnames(grid.column, grid.column__default8)}
                    >
                      <h2
                        className={headline}
                        dangerouslySetInnerHTML={{
                          __html: post.data.title.html,
                        }}
                      />
                    </div>
                  </div>
                </Fragment>
              );

            case 'project':
              return (
                <div
                  className={classnames(grid.row, styles.post)}
                  key={post.id}
                >
                  <div
                    className={classnames(
                      grid.column,
                      grid.column__default8,
                      grid.column__sm4,
                      grid.column__smOffset2,
                      styles.post_introduction
                    )}
                  >
                    <h2 className={headline}>{post.data.title.text}</h2>

                    {post.data.description.map(paragraph => (
                      <p
                        dangerouslySetInnerHTML={{ __html: paragraph.html }}
                        key={paragraph.html}
                      />
                    ))}
                  </div>

                  {post.metadata.map((metadata, index) => (
                    <div
                      className={classnames(
                        grid.column,
                        grid.column__default4,
                        grid.column__sm2,
                        { [grid.column__smOffset2]: index % 3 === 0 },
                        caption,
                        styles.post_metadata
                      )}
                      key={index}
                    >
                      <div className={styles.post_metadata_title}>
                        {metadata.data.title.text}
                      </div>

                      {metadata.type === 'date' && (
                        <div>
                          {dateformat(metadata.data.date, 'mmm yyyy', true)}
                        </div>
                      )}

                      {metadata.type === 'links' &&
                        metadata.data.links.map((item, index) => (
                          <p key={index}>
                            <a
                              href={item.link.url}
                              target={item.link.target}
                              {...(item.link.target === '_blank'
                                ? { rel: 'noopener' }
                                : {})}
                            >
                              {item.title.text}
                            </a>
                          </p>
                        ))}

                      {metadata.type === 'text' &&
                        metadata.data.items.map((item, index) => (
                          <p key={index}>{item.text}</p>
                        ))}
                    </div>
                  ))}

                  <div
                    className={classnames(
                      grid.column,
                      grid.column__default8,
                      styles.post_gallery
                    )}
                  >
                    <div className={grid.row}>
                      {<Gallery data={post.data.gallery} />}
                    </div>
                  </div>
                </div>
              );

            default:
              return false;
          }
        })}
      </div>
    </section>
  </div>
);

App.propTypes = { data: object.isRequired };

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/static/service-worker.js')
    .catch(() => console.warn('Could not register the service worker!'));
}

export default App;
