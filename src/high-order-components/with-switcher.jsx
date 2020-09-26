import React, {PureComponent} from 'react';

const withSwitcher = (WrappedComponent) => {

  class WithSwitcher extends PureComponent {

    constructor(props) {
      super(props);

      this.state = {
        isOpened: false
      };

      this.handleSwitchListOpened = this.handleSwitchListOpened.bind(this);
    }

    handleSwitchListOpened() {
      this.setState({isOpened: !this.state.isOpened});
    }

    render() {
      return <WrappedComponent
        onSwitch={this.handleSwitchListOpened}
        isOpened={this.state.isOpened}
        {...this.props}
      />;
    }
  }

  WithSwitcher.propTypes = {};

  return WithSwitcher;
};

export default withSwitcher;
