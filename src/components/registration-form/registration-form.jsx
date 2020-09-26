import React from 'react';
import {connect} from 'react-redux';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import {isValidPhone} from '../../utils/utils';
import {Operation} from '../../reducers/user/user';
import RoutePath from '../../config/routes';
import LoadingButton from '../loading-button/loading-button';
import {Link} from 'react-router-dom';
import {emailIsValid} from '../../utils/utils';
import {getRegistrationInProgressFlag} from '../../reducers/user/selectors';

class RegistrationForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      firstName: ``,
      lastName: ``,
      phone: ``,
      password: ``,
      password_confirmation: ``,
      email: ``,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }


  handleRegister(evt) {
    evt.preventDefault();
    this.props.register(this.state);
  }

  handleChange(field, evt) {
    this.setState({[field]: evt.target.value});
  }

  handleValidation() {

    const fields = this.state;
    let formIsValid = true;

    if (!fields[`firstName`]) {
      formIsValid = false;
    }

    if (typeof fields[`firstName`] !== `undefined`) {
      if (!fields[`firstName`].match(/^[a-zA-Za-яА-Я]+$/)) {
        formIsValid = false;
      }
    }

    if (!fields[`lastName`]) {
      formIsValid = false;
    }

    if (typeof fields[`lastName`] !== `undefined`) {
      if (!fields[`lastName`].match(/^[a-zA-Za-яА-Я]+$/)) {
        formIsValid = false;
      }
    }
    if ((!fields[`phone`]) || !isValidPhone(fields[`phone`])) {
      formIsValid = false;
    }

    if (!emailIsValid(fields[`email`])) {
      formIsValid = false;
    }

    if (!fields[`password`]) {
      formIsValid = false;
    }

    if (!fields[`password_confirmation`]) {
      formIsValid = false;
    }

    if (fields[`password`] !== fields[`password_confirmation`]) {
      formIsValid = false;
    }


    return formIsValid;
  }

  render() {

    const {firstName, lastName, phone, email, password, password_confirmation} = this.state;
    const {isRegistrationInProgress} = this.props;
    const formIsValid = this.handleValidation();

    const RegisterButton = () => {
      return (
        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.handleRegister} disabled={!formIsValid}>
        Register
        </button>
      );
    };

    return (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">REGISTRATION</div>
            <div className="card-body">

              <form className="form-horizontal" method="post" action="#">

                <div className="form-group">
                  <label htmlFor="name" className="cols-sm-2 control-label">First name</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                      <input type="text" className="form-control" name="firstName" id="name" onChange={(evt) => this.handleChange(`firstName`, evt)} placeholder="Enter your first name" value={firstName} />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username" className="cols-sm-2 control-label">Last name</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                      <input type="text" className="form-control" name="lastName" onChange={(evt) => this.handleChange(`lastName`, evt)} id="username" placeholder="Enter your last name" value={lastName} />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username" className="cols-sm-2 control-label">Phone</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                      <InputMask mask="+7 (999) 999-99-99" type="text" className="form-control" name="phone" id="phone" onChange={(evt) => this.handleChange(`phone`, evt)} placeholder="Enter your phone number" value={phone}/>
                    </div>
                  </div>
                </div>


                <div className="form-group">
                  <label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
                      <input type="text" className="form-control" onChange={(evt) => this.handleChange(`email`, evt)} name="email" id="email" placeholder="Enter your Email" value={email}/>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                      <input type="password" className="form-control" onChange={(evt) => this.handleChange(`password`, evt)} name="password" id="password" placeholder="Enter your Password" value={password} />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                      <input type="password" className="form-control" onChange={(evt) => this.handleChange(`password_confirmation`, evt)} name="confirm" id="confirm" placeholder="Confirm your Password" value={password_confirmation} />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  {isRegistrationInProgress ? <LoadingButton /> : <RegisterButton /> }
                </div>

                <div className="login-register">
                        Already registered? You can <Link to={RoutePath.LOGIN}> here </Link>.
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

    );
  }
}

RegistrationForm.propTypes = {
  isRegistrationInProgress: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired

};


const mapStateToProps = (state) => ({
  isRegistrationInProgress: getRegistrationInProgressFlag(state)
});

const mapDispatchToProps = (dispatch) => ({

  register(order) {
    dispatch(Operation.register(order));
  },

});


export {RegistrationForm};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);


