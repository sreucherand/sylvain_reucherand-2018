import { string } from 'prop-types';
import React from 'react';

import Media from './Media';
import styles from './media.css';

export default class Image extends Media {
  static propTypes = {
    base64: string.isRequired,
    url: string.isRequired,
  };

  state = { isVisible: false };

  onLoad = () => {
    this.setState({ isLoaded: true });
  };

  load() {
    this.setState({ isVisible: true });
  }

  render() {
    const { base64, url } = this.props;
    const { isLoaded, isVisible } = this.state;

    return (
      <>
        <img
          alt=""
          className={styles.placeholder}
          ref={this.element}
          src={base64}
        />

        {isVisible && (
          <img
            alt=""
            onLoad={this.onLoad}
            src={url}
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
        )}

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img alt="" src="${url}" />`,
          }}
        />
      </>
    );
  }
}
