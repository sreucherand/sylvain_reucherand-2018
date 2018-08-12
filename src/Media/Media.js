import 'intersection-observer';
import React, { PureComponent } from 'react';

export default class Media extends PureComponent {
  state = { isLoaded: false };

  constructor(props) {
    super(props);

    this.element = React.createRef();
  }

  componentDidMount() {
    const io = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.load();
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    io.observe(this.element.current);
  }

  onLoad = () => {
    this.setState({ isLoaded: true });
  };

  load() {}

  render() {
    return false;
  }
}
