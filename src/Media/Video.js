import { bool, string } from 'prop-types';
import React from 'react';

import Media from './Media';

export default class Image extends Media {
  static defaultProps = { play: false };

  static propTypes = {
    base64: string.isRequired,
    play: bool,
    url: string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { isPlaying: props.play, isVisible: false };
  }

  componentDidUpdate(prevProps) {
    if (this.props.play === prevProps.play || !this.videoElement) {
      return;
    }

    if (this.props.play === true) {
      this.videoElement.play();
      return;
    }

    this.videoElement.pause();
  }

  onLoad = () => {
    this.setState({ isLoaded: true });

    if (this.props.play) {
      this.videoElement.play();
    }
  };

  load() {
    this.setState({ isVisible: true });
  }

  setVideoElement = element => {
    this.videoElement = element;

    if (this.videoElement.readyState > 3) {
      this.onLoad();
      return;
    }

    this.videoElement.addEventListener('canplaythrough', this.onLoad, false);
    this.videoElement.load();
  };

  render() {
    const { base64, url } = this.props;
    const { isPlaying, isLoaded, isVisible } = this.state;

    return (
      <>
        <img alt="" ref={this.element} src={base64} />

        {isVisible && (
          <video
            autoPlay={isPlaying}
            loop
            muted
            playsInline
            ref={this.setVideoElement}
            src={url}
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
        )}

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<video controls loop muted playsInline src="${url}" />`,
          }}
        />
      </>
    );
  }
}
