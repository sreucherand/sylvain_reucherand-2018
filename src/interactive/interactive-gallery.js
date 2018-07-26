import assign from 'lodash/assign';
import clamp from 'lodash/clamp';
import classnames from 'classnames';
import Hammer from 'hammerjs';
import includes from 'lodash/includes';
import numeral from 'numeral';
import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import rebound from 'rebound';

import Interactive from './interactive';
import Resize from '../resize/resize';
import Spring from '../spring/spring';

const format = (index, length, caption) => `${numeral(index).format('00')}/${numeral(length).format('00')} — ${caption}`;

class Player extends PureComponent {

  constructor (props) {
    super(props);

    this.handleRef = this.handleRef.bind(this);
  }

  handleRef (node) {
    if (!node || this.video !== undefined) {
      return;
    }

    this.video = node;
  }

  componentWillReceiveProps (props) {
    if (this.video === undefined) {
      return;
    }

    if (props.play === true && this.props.play === false) {
      this.video.play();

      return;
    }

    if (props.play === false && this.props.play === true) {
      this.video.pause();

      return;
    }
  }

  render () {
    const props = assign({}, this.props, {
      autoPlay: this.props.play,
      ref: this.handleRef,
    });

    delete props.play;

    return React.createElement('video', props);
  }

}

class GalleryComponent extends PureComponent {

  constructor (props) {
    super(props);

    this._currentIndex = 0;

    this.state = {
      cache: [],
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

  componentDidMount () {
    if (this.element === undefined) {
      return;
    }

    this.gestureManager = new Hammer.Manager(this.element);

    this.gestureManager.add(new Hammer.Pan({direction: Hammer.DIRECTION_HORIZONTAL, threshold: 5}));
    this.gestureManager.add(new Hammer.Press({threshold: 5, time: 0}));

    this.gestureManager.on('panmove', this.handlePan.bind(this));
    this.gestureManager.on('panstart', this.handleStart.bind(this));
    this.gestureManager.on('panend pancancel', this.handleRelease.bind(this));

    this.gestureManager.on('press', this.handlePress.bind(this));
    this.gestureManager.on('pressup', this.handlePressUp.bind(this));

    for (let item of this.props.data) {
      if (item.media.type === 'image') {
        const image = new Image();
        image.onload = () => this.setState(state => ({cache: [...state.cache, item.media.src]}));
        image.src = item.media.src;
      }
    }
  }

  handleControlLeftClick () {
    this.currentIndex = this.currentIndex - 1;
    this.spring.to(this.currentIndex);
  }

  handleControlRightClick () {
    this.currentIndex = this.currentIndex + 1;
    this.spring.to(this.currentIndex);
  }

  handleMeasure (size) {
    this.setState({width: size.width});
  }

  handlePan (event) {
    this.velocity = event.center.x - this.center;
    this.center = event.center.x;

    let progress = this.velocity / -this.state.width;

    const value = this.spring.value;
    
    if ((value + progress) < 0 || (value + progress) > this.props.data.length - 1) {
      progress *= 0.5;
    }
    
    this.spring.value = value + progress;
    this.spring.setAtRest();
  }

  handlePress () {
    this.setState({grabbing: true});
  }

  handlePressUp () {
    this.setState({grabbing: false});
  }

  handleRef (node) {
    if (this.element === undefined && node) {
      this.element = node;
    }
  }

  handleRelease (evt) {
    const currentPosition = this.spring.value;

    const velocityTolerance = Math.abs(this.velocity) > 3;
    const distanceTolerance = Math.abs(currentPosition - this.currentIndex) > 0.3;

    if (velocityTolerance || distanceTolerance) {
      const displacement = currentPosition + this.velocity * 5 / -this.state.width;

      this.currentIndex = this.velocity > 0 ? Math.floor(displacement) : Math.ceil(displacement);
    }

    const velocity = this.velocity / -this.state.width;

    this.spring.to(this.currentIndex);
    this.spring.velocity = velocity * 30;

    this.setState({grabbing: false});
  }

  handleSpringUpdate (value) {
    this.setState({progress: value});
  }

  handleStart (event) {
    this.center = event.center.x;
    this.spring.setAtRest();
  }

  render () {
    const transform = `translate(${-this.state.progress * this.state.width}px)`;

    return [
      <div
        key="controls"
        className="grid__row__column grid__row__column--xs-8 grid__row__column--sm-1 grid__row__column--sm-offset-1">
        <div className="gallery__controls">
          <div
            className={classnames("gallery__controls__control", {"gallery__controls__control--disabled": this.state.index <= 0})}
            onClick={this.handleControlLeftClick}>
            <svg viewBox="0 0 7.8 14.2">
              <polyline
                fill="none"
                points="7.5,0.4 0.7,7.1 7.5,13.9"></polyline>
            </svg>
          </div>

          <div
            className={classnames("gallery__controls__control", {"gallery__controls__control--disabled": this.state.index >= this.props.data.length - 1})}
            onClick={this.handleControlRightClick}>
            <svg viewBox="0 0 7.8 14.2">
              <polyline
                fill="none"
                points="0.4,0.4 7.1,7.1 0.4,13.9"></polyline>
            </svg>
          </div>
        </div>
      </div>,

      <Resize
        key="main"
        onMeasure={this.handleMeasure}>
        {
          ({measureRef}) => (
            <div
              className="grid__row__column grid__row__column--xs-8 grid__row__column--sm-4"
              ref={measureRef}>
              <div
                className={classnames('gallery__inner', {'gallery__inner--grabbing': this.state.grabbing})}
                ref={this.handleRef}>
                {
                  this.props.data.map((item, index) => (
                    <div
                      key={index}
                      className="gallery__item"
                      style={{transform: transform, WebkitTransform: transform}}>
                      {
                        item.media.type === 'image' && (
                          <div style={{backgroundImage: `url('${item.media.src}')`, opacity: includes(this.state.cache, item.media.src) ? 1 : 0}} />
                        )
                      }

                      {
                        item.media.type === 'video' && (
                          <div>
                            <Player
                              loop
                              muted
                              playsInline
                              play={index === this.state.index}
                              preload="auto"
                              src={item.media.src} />
                          </div>
                        )
                      }
                    </div>
                  ))
                } 
              </div>
            </div>
          )
        }
      </Resize>,

      <div
        key="caption"
        className="grid__row__column grid__row__column--xs-8 grid__row__column--sm-4 grid__row__column--sm-offset-2">
        <div className="gallery__caption">
          {
            this.props.data
              .reduce((previous, current, index, items) => {
                const caption = format(index + 1, items.length, current.caption);

                if (caption.length > previous.length) {
                  return caption;
                }

                return previous;
              }, format(1, this.props.data.length, this.props.data[0].caption))
          }

          {
            this.props.data.map((item, index, items) => {
              const progress = rebound.MathUtil.mapValueInRange(clamp(this.state.progress, 0, items.length - 1), index - 0.25, index + 0.25, 1, -1);
              const opacity = clamp(1 - Math.abs(progress), 0, 1);

              return (
                <div
                  key={index}
                  className="gallery__caption__item"
                  style={{opacity: opacity}}>{format(index + 1, items.length, item.caption)}</div>
              );
            })
          }
        </div>
      </div>,
    ];
  }

  get currentIndex () {
    return this._currentIndex || 0;
  }

  set currentIndex (index) {
    this._currentIndex = clamp(index, 0, this.props.data.length - 1);

    this.setState({index: this._currentIndex});
  }

}

export default class InteractiveGallery extends Interactive {

  constructor (element) {
    super(element);

    const script = this.element.querySelector('script');

    this.data = JSON.parse(script.innerHTML);

    this.element.removeChild(script);

    ReactDOM.render(<GalleryComponent data={this.data} />, this.element);
  }

}
