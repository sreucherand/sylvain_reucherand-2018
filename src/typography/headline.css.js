import * as breakpoints from '../variables/breakpoints';
import {sequelSansHeadline} from '../variables/font-families';
import {headline} from '../variables/font-sizes';

export default `
  .headline {
    font-family: ${sequelSansHeadline.fontFamily};
    font-size: ${headline.default.fontSize}px;
    font-weight: ${headline.default.fontWeight};
    line-height: ${headline.default.lineHeight}em;

    @media screen and (min-width: ${breakpoints.sm}px) {
      font-size: ${headline.sm.fontSize}px;
    }

    @media screen and (min-width: ${breakpoints.md}px) {
      font-size: ${headline.md.fontSize}px;
    }

    @media screen and (min-width: ${breakpoints.lg}px) {
      font-size: ${headline.lg.fontSize}px;
    }
  }
`;
