import keys from 'lodash/keys';
import omit from 'lodash/omit';

import * as breakpoints from '../variables/breakpoints';
import * as colors from '../variables/colors';
import { sequelSansBodyText } from '../variables/font-families';
import { body } from '../variables/font-sizes';
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
    background-color: ${colors.background.light};
    color: ${colors.body.light};
    font-family: ${sequelSansBodyText.fontFamily};
    font-size: ${body.default.fontSize}px;
    font-weight: ${body.default.fontWeight};
    line-height: ${body.default.lineHeight}em;

    @media (prefers-color-scheme: dark) {
      background-color: ${colors.background.dark};
      color: ${colors.body.dark};
    }

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

        svg {
          fill: currentColor;
          margin-left: 0.2em;
          position: relative;
          top: -0.3em;
          width: 0.38em;
        }
      }

      &_title {
        color: ${colors.key.light};

        @media (prefers-color-scheme: dark) {
          color: ${colors.key.dark};
        }
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

    ${keys(omit(grid.outerGutters, 'default'))
      .map(key => {
        const breakpoint = breakpoints[key];
        const gutter = grid.outerGutters[key];

        return `
        @media screen and (min-width: ${breakpoint}px) {
          top: ${gutter}px;
        }
      `;
      })
      .join('')}
  }
`;
