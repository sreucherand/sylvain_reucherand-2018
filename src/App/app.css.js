import keys from 'lodash/keys';
import omit from 'lodash/omit';

import * as breakpoints from '../variables/breakpoints';
import {sequelSansBodyText} from '../variables/font-families';
import {body} from '../variables/font-sizes';
import * as grid from '../variables/grid';

export default `
  @font-face {
    font-family: 'Sequel Sans Body Text';
    src: url('../fonts/sequel_sans-light_body_text.woff2') format('woff2'),
      url('../fonts/sequel_sans-light_body_text.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Sequel Sans Body Text';
    src: url('../fonts/sequel_sans-book_body_text.woff2') format('woff2'),
      url('../fonts/sequel_sans-book_body_text.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Sequel Sans Body Text';
    src: url('../fonts/sequel_sans-book_oblique_body_text.woff2') format('woff2'),
      url('../fonts/sequel_sans-book_oblique_body_text.woff') format('woff');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Sequel Sans Headline';
    src: url('../fonts/sequel_sans-light_headline.woff2') format('woff2'),
      url('../fonts/sequel_sans-light_headline.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  html,
  body {
    overflow-x: hidden;
  }
  body {
    background-color: #efeeec;
    font-family: ${sequelSansBodyText.fontFamily};
    font-size: ${body.default.fontSize}px;
    font-weight: ${body.default.fontWeight};
    line-height: ${body.default.lineHeight}em;

    @media screen and (min-width: ${breakpoints.md}px) {
      font-size: ${body.md.fontSize}px;
    }

    @media screen and (min-width: ${breakpoints.lg}px) {
      font-size: ${body.lg.fontSize}px;
    }
  }

  * {
    vertical-align: baseline;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration-skip: ink;
  }

  h1 {
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
  }

  .post {
    margin-bottom: 10.94em;

    &_introduction {
      a {
        text-decoration: underline;
      }

      h2 + p {
        margin-top: 3.06em;
      }

      p + p {
        margin-top: 1em;
      }
    }

    &_metadata {
      a {
        text-decoration: none;

        &:after {
          background-image: url("data:image/svg+xml;charset=UTF-8, <svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%' viewBox='0 0 5.1 5.1'><polygon points='5.1,0 5.1,3.7 4.1,3.7 4.1,1.7 0.7,5.1 0,4.4 3.4,1 1.4,1 1.4,0'/></svg>");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% auto;
          content: '';
          margin-left: 0.3em;
          padding-right: 0.5em;
          position: relative;
          top: -0.1em;
        }
      }

      &_title {
        color: #a9a9a9;
      }
    }

    &_introduction + &_metadata,
    &_introduction + &_gallery,
    &_metadata + &_metadata,
    &_metadata + &_gallery {
      margin-top: 3.06em;
    }
  }

  .date {
    margin-bottom: 0.9em;
  }

  #recent {
    padding-top: 21.76em;
  }

  #title {
    left: 0;
    position: fixed;
    right: 0;
    top: ${grid.outerGutters.default}px;
    z-index: 10;

    ${keys(omit(grid.outerGutters, 'default')).map((key) => {
      const breakpoint = breakpoints[key];
      const gutter = grid.outerGutters[key];

      return `
        @media screen and (min-width: ${breakpoint}px) {
          top: ${gutter}px;
        }
      `;
    }).join('')}
  }
`;
