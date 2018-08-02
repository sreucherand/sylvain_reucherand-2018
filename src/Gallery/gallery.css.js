import keys from 'lodash/keys';
import omit from 'lodash/omit';

import * as breakpoints from '../variables/breakpoints';
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
      color: #a9a9a9;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
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
        stroke: #000000;
        width: 10px;
        transition: stroke 400ms;
      }

      &__disabled {
        cursor: auto;

        svg {
          stroke: #a9a9a9;
        }
      }
    }

    @media screen and (min-width: ${breakpoints.sm}px) {
      &:before {
        background-color: #efeeec;
        bottom: -1px;
        content: '';
        pointer-events: none;
        position: absolute;
        right: ${-grid.gutters.default}px;
        top: -1px;
        width: 50vw;
        z-index: -1;

        ${keys(omit(grid.gutters, 'default')).map((key) => {
          const breakpoint = breakpoints[key];
          const gutter = grid.gutters[key];

          return `
            @media screen and (min-width: ${breakpoint}px) {
              right: ${-gutter}px;
            }
          `;
        }).join('')}
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
    background-color: #e8e7e4;
    flex-basis: 100%;
    flex-shrink: 0;
    margin-right: ${grid.gutters.default}px;

    ${keys(omit(grid.gutters, 'default')).map((key) => {
      const breakpoint = breakpoints[key];
      const gutter = grid.gutters[key];

      return `
        @media screen and (min-width: ${breakpoint}px) {
          margin-right: ${gutter}px;
        }
      `;
    }).join('')}

    div {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      overflow: hidden;
      padding-top: 56.25%;
      position: relative;
      transition: opacity 400ms;

      video {
        height: calc(100% + 1px);
        left: 0;
        object-fit: cover;
        position: absolute;
        top: 0;
        width: calc(100% + 1px);
      }
    }
  }
`;
