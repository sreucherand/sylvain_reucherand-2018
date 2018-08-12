import clamp from 'lodash/clamp';
import classnames from 'classnames';
import Hammer from 'hammerjs';
import 'intersection-observer';
import numeral from 'numeral';
import { array } from 'prop-types';
import React, { PureComponent } from 'react';
import rebound from 'rebound';

import { caption } from '../typography/caption.css';
import styles from './gallery.css';
import grid from '../grid/grid.css';
import Image from '../Media/Image';
import Resize from '../Resize/Resize';
import Spring from '../Spring/Spring';
import Video from '../Media/Video';

const format = (index, length, caption) =>
  `${numeral(index).format('00')}/${numeral(length).format('00')} — ${
    caption.text
  }`;

export default class Gallery extends PureComponent {
  static propTypes = {
    data: array.isRequired,
  };

  constructor(props) {
    super(props);

    this._currentIndex = 0;

    this.state = {
      grabbing: false,
      index: 0,
      progress: 0,
      width: 0,
    };

    this.center = 0;
    this.velocity = 0;

    this.spring = new Spring();
    this.spring.on('update', this.handleSpringUpdate.bind(this));

    this.handleControlLeftClick = this.handleControlLeftClick.bind(this);
    this.handleControlRightClick = this.handleControlRightClick.bind(this);
    this.handleMeasure = this.handleMeasure.bind(this);
    this.handleRef = this.handleRef.bind(this);
  }

  componentDidMount() {
    if (this.element === undefined) {
      return;
    }

    this.gestureManager = new Hammer.Manager(this.element);

    this.gestureManager.add(
      new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 5 })
    );
    this.gestureManager.add(new Hammer.Press({ threshold: 5, time: 0 }));

    this.gestureManager.on('panmove', this.handlePan.bind(this));
    this.gestureManager.on('panstart', this.handleStart.bind(this));
    this.gestureManager.on('panend pancancel', this.handleRelease.bind(this));

    this.gestureManager.on('press', this.handlePress.bind(this));
    this.gestureManager.on('pressup', this.handlePressUp.bind(this));
  }

  handleControlLeftClick() {
    this.currentIndex = this.currentIndex - 1;
    this.spring.to(this.currentIndex);
  }

  handleControlRightClick() {
    this.currentIndex = this.currentIndex + 1;
    this.spring.to(this.currentIndex);
  }

  handleMeasure(size) {
    this.setState({ width: size.width });
  }

  handlePan(event) {
    this.velocity = event.center.x - this.center;
    this.center = event.center.x;

    let progress = this.velocity / -this.state.width;

    const value = this.spring.value;

    if (value + progress < 0 || value + progress > this.props.data.length - 1) {
      progress *= 0.5;
    }

    this.spring.value = value + progress;
    this.spring.setAtRest();
  }

  handlePress() {
    this.setState({ grabbing: true });
  }

  handlePressUp() {
    this.setState({ grabbing: false });
  }

  handleRef(node) {
    if (this.element === undefined && node) {
      this.element = node;
    }
  }

  handleRelease(evt) {
    const currentPosition = this.spring.value;

    const velocityTolerance = Math.abs(this.velocity) > 3;
    const distanceTolerance =
      Math.abs(currentPosition - this.currentIndex) > 0.3;

    if (velocityTolerance || distanceTolerance) {
      const displacement =
        currentPosition + (this.velocity * 5) / -this.state.width;

      this.currentIndex =
        this.velocity > 0 ? Math.floor(displacement) : Math.ceil(displacement);
    }

    const velocity = this.velocity / -this.state.width;

    this.spring.to(this.currentIndex);
    this.spring.velocity = velocity * 30;

    this.setState({ grabbing: false });
  }

  handleSpringUpdate(value) {
    this.setState({ progress: value });
  }

  handleStart(event) {
    this.center = event.center.x;
    this.spring.setAtRest();
  }

  render() {
    const transform = `translate(${-this.state.progress * this.state.width}px)`;

    return [
      <div
        key="controls"
        className={classnames(
          grid.column,
          grid.column__default8,
          grid.column__sm1,
          grid.column__smOffset1
        )}
      >
        <div className={styles.controls}>
          <div
            className={classnames(styles.controls_control, {
              [styles.controls_control__disabled]: this.state.index <= 0,
            })}
            onClick={this.handleControlLeftClick}
          >
            <svg viewBox="0 0 7.8 14.2">
              <polyline fill="none" points="7.5,0.4 0.7,7.1 7.5,13.9" />
            </svg>
          </div>

          <div
            className={classnames(styles.controls_control, {
              [styles.controls_control__disabled]:
                this.state.index >= this.props.data.length - 1,
            })}
            onClick={this.handleControlRightClick}
          >
            <svg viewBox="0 0 7.8 14.2">
              <polyline fill="none" points="0.4,0.4 7.1,7.1 0.4,13.9" />
            </svg>
          </div>
        </div>
      </div>,

      <Resize key="main" onMeasure={this.handleMeasure}>
        {({ measureRef }) => (
          <div
            className={classnames(
              grid.column,
              grid.column__default8,
              grid.column__sm4
            )}
            ref={measureRef}
          >
            <div
              className={classnames(styles.inner, {
                [styles.inner__grabbing]: this.state.grabbing,
              })}
              ref={this.handleRef}
            >
              {this.props.data.map((item, index) => (
                <div
                  key={index}
                  className={styles.item}
                  style={{ transform: transform, WebkitTransform: transform }}
                >
                  <div className={styles.item_media}>
                    {item.media.kind === 'image' && (
                      <Image base64={item.media.base64} url={item.media.url} />
                    )}

                    {item.media.kind === 'video' && (
                      <Video
                        base64={item.media.base64}
                        play={index === this.state.index}
                        url={item.media.url}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Resize>,

      <div
        key="caption"
        className={classnames(
          grid.column,
          grid.column__default8,
          grid.column__sm4,
          grid.column__smOffset2,
          caption
        )}
      >
        <div className={styles.caption}>
          {this.props.data.reduce((previous, current, index, items) => {
            const caption = format(index + 1, items.length, current.caption);

            if (caption.length > previous.length) {
              return caption;
            }

            return previous;
          }, format(1, this.props.data.length, this.props.data[0].caption))}

          {this.props.data.map((item, index, items) => {
            const progress = rebound.MathUtil.mapValueInRange(
              clamp(this.state.progress, 0, items.length - 1),
              index - 0.25,
              index + 0.25,
              1,
              -1
            );
            const opacity = clamp(1 - Math.abs(progress), 0, 1);

            return (
              <div
                key={index}
                className={styles.caption_item}
                style={{ opacity: opacity }}
              >
                {format(index + 1, items.length, item.caption)}
              </div>
            );
          })}
        </div>
      </div>,
    ];
  }

  get currentIndex() {
    return this._currentIndex || 0;
  }

  set currentIndex(index) {
    this._currentIndex = clamp(index, 0, this.props.data.length - 1);

    this.setState({ index: this._currentIndex });
  }
}
