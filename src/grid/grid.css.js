/* eslint-disable indent */
import keys from 'lodash/keys';
import omit from 'lodash/omit';
import range from 'lodash/range';

import * as breakpoints from '../variables/breakpoints';
import * as grid from '../variables/grid';

export default `
  .grid {
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: ${grid.maxWidth}px;
    padding-left: ${grid.outerGutters.default}px;
    padding-right: ${grid.outerGutters.default}px;

    ${keys(omit(grid.outerGutters, 'default')).map((key) => {
      const breakpoint = breakpoints[key];
      const gutter = grid.outerGutters[key];

      return `
        @media screen and (min-width: ${breakpoint}px) {
          padding-left: ${gutter}px;
          padding-right: ${gutter}px;
        }
      `;
    }).join('')}
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: ${-grid.gutters.default / 2}px;
    margin-right: ${-grid.gutters.default / 2}px;

    ${keys(omit(grid.gutters, 'default')).map((key) => {
      const breakpoint = breakpoints[key];
      const gutter = grid.gutters[key];

      return `
        @media screen and (min-width: ${breakpoint}px) {
          margin-left: ${-gutter / 2}px;
          margin-right: ${-gutter / 2}px;
        }
      `;
    }).join('')}
  }

  .column {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 1px;
    padding-left: ${grid.gutters.default / 2}px;
    padding-right: ${grid.gutters.default / 2}px;

    ${keys(omit(grid.gutters, 'default')).map((key) => {
      const breakpoint = breakpoints[key];
      const gutter = grid.gutters[key];

      return `
        @media screen and (min-width: ${breakpoint}px) {
          padding-left: ${gutter / 2}px;
          padding-right: ${gutter / 2}px;
        }
      `;
    }).join('')}

    ${range(grid.columnCount + 1).map(index => `
      &__default${index} {
        flex-basis: ${(100 / grid.columnCount) * index}%;
        max-width: ${(100 / grid.columnCount) * index}%;
      }

      &__defaultOffset${index} {
        margin-left: ${(100 / grid.columnCount) * index}%;
      }
    `).join('')}

    ${keys(breakpoints).map((key) => {
      const breakpoint = breakpoints[key];

      return range(grid.columnCount + 1).map(index => `
        &__${key}${index} {
          @media screen and (min-width: ${breakpoint}px) {
            flex-basis: ${(100 / grid.columnCount) * index}%;
            max-width: ${(100 / grid.columnCount) * index}%;
          }
        }

        &__${key}Offset${index} {
          @media screen and (min-width: ${breakpoint}px) {
            margin-left: ${(100 / grid.columnCount) * index}%;
          }
        }
      `).join('');
    }).join('')}
  }
`;
