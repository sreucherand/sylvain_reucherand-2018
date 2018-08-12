const childProcess = require('child_process');
const mime = require('mime-types');
const path = require('path');
const request = require('request');
const sharp = require('sharp');

const fetch = require('./fetch');
const format = require('../Html/format');

const cache = {
  cache: {},

  get(key) {
    return cache[key];
  },

  set(key, value) {
    cache[key] = value;

    return value;
  },
};

module.exports = {
  Feed: {
    data: feed => feed.data,
  },

  FeedData: {
    posts: feed => feed.posts.map(post => fetch.fetchDocument(post.post.id)),
    title: feed => feed.title1,
  },

  File: {
    __resolveType(document) {
      if (document.kind === 'image') {
        return 'Image';
      }

      if (/^video\//.test(mime.lookup(document.url)) === true) {
        return 'Video';
      }

      return 'Document';
    },
  },

  Image: {
    base64(media) {
      const basename = path.basename(media.url);
      const cachedBase64 = cache.get(basename);

      if (cachedBase64 !== undefined) {
        return cachedBase64;
      }

      return new Promise((resolve, reject) => {
        const resizer = sharp()
          .resize(20)
          .toBuffer((error, buffer) => {
            if (error !== null) {
              reject(
                new Error('An error occurred, the image could not be resized!')
              );
            }

            const string = buffer.toString('base64');
            const type = mime.lookup(media.url);

            const base64 = cache.set(basename, `data:${type};base64,${string}`);

            resolve(base64);
          });

        request(media.url).pipe(resizer);
      });
    },
  },

  Metadata: {
    __resolveType(metadata) {
      switch (metadata.slice_type) {
        case 'date':
          return 'MetadataDate';

        case 'links':
          return 'MetadataLink';

        case 'text':
          return 'MetadataText';
      }
    },
  },

  MetadataDate: {
    data: metadata => metadata.primary,
    type: metadata => metadata.slice_type,
  },

  MetadataDateData: {
    date: metadata => metadata.date,
    title: metadata => metadata.title1,
  },

  MetadataLink: {
    data: metadata => metadata,
    type: metadata => metadata.slice_type,
  },

  MetadataLinkData: {
    links: metadata =>
      metadata.items.map(link =>
        Object.assign({}, link, { title: link.title1 })
      ),
    title: metadata => metadata.primary.title1,
  },

  MetadataText: {
    data: metadata => metadata,
    type: metadata => metadata.slice_type,
  },

  MetadataTextData: {
    items: metadata => metadata.items.map(text => text.text),
    title: metadata => metadata.primary.title1,
  },

  Post: {
    __resolveType(post) {
      switch (post.type) {
        case 'news':
          return 'News';

        case 'project':
          return 'Project';
      }
    },
  },

  Project: {
    metadata: post => post.data.body,
  },

  Query: {
    feed: fetch.fetchFeed,
  },

  Text: {
    html: title => format(title),
    text: title => title[0].text,
  },

  Video: {
    base64(media) {
      const basename = path.basename(media.url);
      const cachedBase64 = cache.get(basename);

      if (cachedBase64 !== undefined) {
        return cachedBase64;
      }

      return new Promise((resolve, reject) => {
        const ffmpeg = childProcess.spawn('ffmpeg', [
          '-i',
          media.url,
          '-loglevel',
          'panic',
          '-vf',
          '"select=eq(n,0)"',
          '-vf',
          'scale=20:-2',
          '-q:v',
          1,
          '-vframes',
          1,
          '-f',
          'image2',
          'pipe:',
        ]);

        ffmpeg.stdout.on('data', data => {
          const base64 = cache.set(
            basename,
            `data:image/jpeg;base64,${data.toString('base64')}`
          );

          resolve(base64);
        });

        ffmpeg.stderr.on('data', reject);
      });
    },
    kind: () => 'video',
  },
};
