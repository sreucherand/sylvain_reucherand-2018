import {md} from '../variables/breakpoints';
import {sequelSansBodyText} from '../variables/font-families';
import {caption} from '../variables/font-sizes';

export default `
  .caption {
    font-family: ${sequelSansBodyText.fontFamily};
    font-size: ${caption.default.fontSize}px;
    font-weight: ${caption.default.fontWeight};
    line-height: ${caption.default.lineHeight}em;

    @media screen and (min-width: ${md}px) {
      font-size: ${caption.md.fontSize}px;
    }
  }
`;
