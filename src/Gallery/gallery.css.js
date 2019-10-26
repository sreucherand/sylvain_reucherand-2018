import keys from 'lodash/keys';
import omit from 'lodash/omit';

import * as breakpoints from '../variables/breakpoints';
import * as colors from '../variables/colors';
import * as grid from '../variables/grid';

export default `
  .caption {
    color: transparent;
    position: relative;
    margin-top: 12px;
    width: 100%;

    @media screen and (min-width: ${breakpoints.sm}px) {
      margin-top: 10px;
    }

    @media screen and (min-width: ${breakpoints.lg}px) {
      margin-top: 12px;
    }

    &_item {
      color: ${colors.key.light};
      left: 0;
      position: absolute;
      right: 0;
      top: 0;

      @media (prefers-color-scheme: dark) {
        color: ${colors.key.dark};
      }
    }
  }

  .controls {
    align-items: center;
    display: flex;
    flex-grow: 1;
    position: relative;
    z-index: 5;

    @media screen and (min-width: ${breakpoints.sm}px) {
      justify-content: center;
    }

    &_control {
      cursor: pointer;
      margin-bottom: 18px;
      margin-right: 22px;
      user-select: none;

      @media screen and (min-width: ${breakpoints.sm}px) {
        margin: 0 11px;
      }

      svg {
        display: block;
        height: 20px;
        stroke: ${colors.body.light};
        width: 10px;
        transition: stroke 400ms;

        @media (prefers-color-scheme: dark) {
          stroke: ${colors.body.dark};
        }
      }

      &__disabled {
        cursor: auto;

        svg {
          stroke: ${colors.disable.light};

          @media (prefers-color-scheme: dark) {
            stroke: ${colors.disable.dark};
          }
        }
      }
    }

    @media screen and (min-width: ${breakpoints.sm}px) {
      &:before {
        background-color: ${colors.background.light};
        bottom: -1px;
        content: '';
        pointer-events: none;
        position: absolute;
        right: ${-grid.gutters.default}px;
        top: -1px;
        width: 50vw;
        z-index: -1;

        @media (prefers-color-scheme: dark) {
          background-color: ${colors.background.dark};
        }

        ${keys(omit(grid.gutters, 'default'))
          .map(key => {
            const breakpoint = breakpoints[key];
            const gutter = grid.gutters[key];

            return `
            @media screen and (min-width: ${breakpoint}px) {
              right: ${-gutter}px;
            }
          `;
          })
          .join('')}
      }
    }
  }

  .inner {
    cursor: -moz-grab;
    cursor: -webkit-grab;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;

    &__grabbing {
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
  }

  .item {
    flex-basis: 100%;
    flex-shrink: 0;
    margin-right: ${grid.gutters.default}px;

    ${keys(omit(grid.gutters, 'default'))
      .map(key => {
        const breakpoint = breakpoints[key];
        const gutter = grid.gutters[key];

        return `
        @media screen and (min-width: ${breakpoint}px) {
          margin-right: ${gutter}px;
        }
      `;
      })
      .join('')}

    &_media {
      overflow: hidden;
      padding-top: 56.25%;
      position: relative;

      img,
      video {
        height: 100%;
        left: 0;
        object-fit: cover;
        position: absolute;
        top: 0;
        -webkit-user-drag: none;
        user-drag: none;
        user-select: none;
        transition: opacity 400ms;
        width: 100%;
      }
    }
  }
`;
