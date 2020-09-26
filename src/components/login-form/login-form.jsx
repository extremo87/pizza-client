import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Operation} from '../../reducers/user/user';
import RoutePath from '../../config/routes';
import LoadingButton from '../loading-button/loading-button';
import {Link} from 'react-router-dom';
import {emailIsValid} from '../../utils/utils';
import {getLoggingInProgressFlag} from '../../reducers/user/selectors';


class LoginForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      email: ``,
      password: ``,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleLogin(evt) {
    evt.preventDefault();
    this.props.login(this.state);
  }


  handleChange(field, evt) {
    this.setState({[field]: evt.target.value});
  }

  handleValidation() {

    const fields = this.state;
    let formIsValid = true;

    if (!fields[`email`] || !emailIsValid(fields[`email`])) {
      formIsValid = false;
    }

    if (!fields[`password`]) {
      formIsValid = false;
    }

    return formIsValid;
  }

  render() {

    const {email, password} = this.state;
    const {isLoggingInProcess} = this.props;
    const formIsValid = this.handleValidation();

    const LoginButton = () => {
      return (
        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.handleLogin} disabled={!formIsValid}>
        Sign in
        </button>
      );
    };

    return (
      <form className="form-signin text-center">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" onChange={(evt) => this.handleChange(`email`, evt)} placeholder="Email address" required autoFocus value={email} />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" id="inputPassword" className="form-control" onChange={(evt) => this.handleChange(`password`, evt)} placeholder="Password" required value={password}/>
        { isLoggingInProcess ? <LoadingButton /> : <LoginButton />}
        <div className="login-register">
            Have no account? You can register <Link to={RoutePath.REGISTER}> here </Link> .
        </div>
      </form>

    );
  }
}

LoginForm.propTypes = {
  isLoggingInProcess: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
  isLoggingInProcess: getLoggingInProgressFlag(state)
});

const mapDispatchToProps = (dispatch) => ({

  login(data) {
    dispatch(Operation.login(data));
  },

});


export {LoginForm};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);


