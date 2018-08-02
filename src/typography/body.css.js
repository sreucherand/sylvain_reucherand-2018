import * as breakpoints from '../variables/breakpoints';
import { sequelSansBodyText } from '../variables/font-families';
import { body } from '../variables/font-sizes';

export default `
  .body {
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
`;
