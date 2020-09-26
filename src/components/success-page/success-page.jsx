import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import history from '../../history';
import {getOrders} from '../../reducers/cart/selectors';
import RoutePath from '../../config/routes';

class SuccessPage extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {id} = this.props.match.params;
    const order = this.props.orders.find((item) => Number(item.id) === Number(id));

    if (!order) {
      history.push(RoutePath.MAINPAGE);
    }

    const {fullname, address, phone} = order;

    return (
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Well done! Dear, {fullname} your order #{id} successfuly created! </h4>
        <p>
         We&rsquo;ll call you on the phone number <b>+{phone}</b> you provided . Usally delivery takes not more than 30 minutes to {address}
        </p>
        <hr />
        <p className="mb-0">Have a nice day! Sincerelly yours, &quot;Your Pizza&quot;</p>
        <hr />

        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <Link to={RoutePath.MAINPAGE} type="button" className="btn btn-outline-success">To main page</Link>
          </div>
        </div>
      </div>
    );
  }
}

SuccessPage.propTypes = {
  match: PropTypes.object,
  orders: PropTypes.array
};

const mapStateToProps = (state) => ({
  orders: getOrders(state),
});

export {SuccessPage};
export default withRouter(connect(mapStateToProps, null)(SuccessPage));
