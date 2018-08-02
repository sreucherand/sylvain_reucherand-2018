import {on, off} from 'dom-event';
import emptyFunction from 'emptyfunction';
import {func} from 'prop-types';
import {PureComponent} from 'react';

export default class Resize extends PureComponent {

  constructor (props, context) {
    super(props, context);

    this.state = {
      innerHeight: typeof window === 'undefined' ? 0 : window.innerHeight,
      innerWidth: typeof window === 'undefined' ? 0 : window.innerWidth,
      measureRef: this.handleMeasureRef.bind(this),
    };

    this.handleResize = this.handleResize.bind(this);
  }

  handleMeasureRef (node) {
    if (!node) {
      return;
    }

    this.props.onMeasure({
      height: node.offsetHeight,
      width: node.offsetWidth,
    });
  }

  handleResize () {
    this.setState({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
      measureRef: this.handleMeasureRef.bind(this),
    });
  }

  componentDidMount () {
    on(window, 'resize', this.handleResize);
  }

  componentWillUnmount () {
    off(window, 'resize', this.handleResize);
  }

  render () {
    return this.props.children(this.state);
  }

}

Resize.defaultProps = {onMeasure: emptyFunction};
Resize.propTypes = {onMeasure: func};
