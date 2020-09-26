import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUserOrders, getOrdersLoadingInProgressFlag} from '../../reducers/user/selectors';
import {Operation} from '../../reducers/user/user';
import OrderHistoryItem from '../order-history-item/order-history-item';
import Spinner from '../spinner/spinner';
import isEmpty from 'lodash/isEmpty';

class OrderHistory extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getOrders();
  }

  render() {

    const {orders, isLoading} = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    if (isEmpty(orders)) {
      return <h4>No orders found</h4>;
    }


    return (
      <div className="row">
        <h1>Order history</h1>
        <div className="col-md-12">
          <table className="table table-hover" style={{fontSize: `small`}}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order</th>
                <th scope="col">Date</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.sort((a, b) => b.id - a.id).map((order) => <OrderHistoryItem order={order} key={order.id} />)}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

OrderHistory.propTypes = {
  match: PropTypes.object,
  orders: PropTypes.array,
  getOrders: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  orders: getUserOrders(state),
  isLoading: getOrdersLoadingInProgressFlag(state)
});

const mapDispatchToProps = (dispatch) => ({

  getOrders() {
    dispatch(Operation.orders());
  },

});

export {OrderHistory};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderHistory));
