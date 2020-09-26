import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser} from '../../reducers/user/selectors';
import {UserType} from '../../types/types';
import {Operation} from '../../reducers/user/user';
import {Link} from 'react-router-dom';
import RoutePath from '../../config/routes';
import isEmpty from 'lodash/isEmpty';


class UserButton extends React.PureComponent {

  constructor() {
    super();

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    this.props.logout();
    this.props.onSwitch();
  }

  render() {

    const {user, isOpened, onSwitch} = this.props;

    if (isEmpty(user)) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to={RoutePath.LOGIN}>
              Sign In
          </Link>
        </li>
      );
    }

    return (
      <li className="nav-item dropdown">
        <a onClick={onSwitch} className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
            <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
          </svg> {user.name}
        </a>
        <div className={`dropdown-menu${isOpened ? ` show` : ``}`} aria-labelledby="navbarDropdownMenuLink">

          <Link className="dropdown-item" href="#">Orders history</Link>
          <Link className="dropdown-item" onClick={this.handleLogOut} href="#">Sign out</Link>

        </div>
      </li>

    );
  }

}

UserButton.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isOpened: PropTypes.bool.isRequired,
  user: UserType
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({

  logout() {
    dispatch(Operation.logout());
  },

});

export {UserButton};
export default connect(mapStateToProps, mapDispatchToProps)(UserButton);
