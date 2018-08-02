import classnames from 'classnames';
import dateformat from 'dateformat';
import 'normalize.css/normalize.css';
import { array, object } from 'prop-types';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { caption } from '../typography/caption.css';
import html from '../Html/format';
import Gallery from '../Gallery/Gallery';
import grid from '../grid/grid.css';
import { headline } from '../typography/headline.css';
import styles from './app.css';

const App = ({ feed, posts }) => (
  <div>
    <Helmet>
      <title>{feed.data.title1[0].text}</title>
      <meta name="description" content={feed.data.description[0].text} />

      <meta property="og:title" content={feed.data.title1[0].text} />
      <meta property="og:image" content={feed.data.image.Facebook.url} />
      <meta property="og:url" content={feed.data.url.url} />
      <meta property="og:site-name" content={feed.data.title1[0].text} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={feed.data.twitter} />
      <meta name="twitter:creator" content={feed.data.twitter} />
      <meta name="twitter:title" content={feed.data.title1[0].text} />
      <meta
        name="twitter:description"
        content={feed.data.description[0].text}
      />
      <meta name="twitter:image:src" content={feed.data.image.Twitter.url} />
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
        {feed.data.posts
          .reduce((previous, { post }) => {
            const result = posts.find(_post => _post.id === post.id);

            if (result === undefined) {
              return previous;
            }

            return [...previous, result];
          }, [])
          .map(post => {
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
                        <div>
                          {dateformat(post.data.date, 'mmm yyyy', true)}
                        </div>
                      </div>
                    </div>

                    <div className={classnames(grid.row, styles.post)}>
                      <div
                        className={classnames(
                          grid.column,
                          grid.column__default8
                        )}
                      >
                        <h2
                          className={headline}
                          dangerouslySetInnerHTML={{
                            __html: html(post.data.title),
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
                      <h2
                        className={headline}
                        dangerouslySetInnerHTML={{
                          __html: html(post.data.title),
                        }}
                      />

                      {post.data.description.map(paragraph => (
                        <p
                          dangerouslySetInnerHTML={{ __html: html(paragraph) }}
                          key={paragraph.text}
                        />
                      ))}
                    </div>

                    {post.data.body.map((slice, index) => (
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
                          {slice.primary.title1[0].text}
                        </div>

                        {slice.slice_type === 'date' && (
                          <div>
                            {dateformat(slice.primary.date, 'mmm yyyy', true)}
                          </div>
                        )}

                        {slice.slice_type === 'links' &&
                          slice.items.map((item, index) => (
                            <p key={index}>
                              <a href={item.link.url} target={item.link.target}>
                                {item.title1[0].text}
                              </a>
                            </p>
                          ))}

                        {slice.slice_type === 'text' &&
                          slice.items.map((item, index) => (
                            <p key={index}>{item.text[0].text}</p>
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
                        <Gallery data={post.data.gallery} />
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

App.propTypes = { feed: object.isRequired, posts: array.isRequired };

export default App;
