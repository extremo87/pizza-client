import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/service/service';
import {getErrorMessage} from '../../reducers/service/selectors';
import {HIDE_ERROR_TIMEOUT} from '../../config/config';

class Alert extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.message !== null) {
      setTimeout(this.props.onClearError, HIDE_ERROR_TIMEOUT);
    }
  }

  render() {
    const {message} = this.props;

    return (
      (message) && <div id="snackbar" className="show">
        {message}
      </div>

    );
  }
}

Alert.propTypes = {
  message: PropTypes.string,
  onClearError: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
  message: getErrorMessage(state),
});


const mapDispatchToProps = (dispatch) => ({
  onClearError() {
    dispatch(ActionCreator.clearError());
  }
});

export {Alert};
export default connect(mapStateToProps, mapDispatchToProps)(Alert);

