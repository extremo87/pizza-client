import React from 'react';
import PropTypes from 'prop-types';
import {getOrderItemsAsString} from '../../utils/utils';
import dayjs from 'dayjs';


const OrderHistoryItem = ({order}) => {

  return (
    <tr>
      <td>{order.id}</td>
      <td>{getOrderItemsAsString(order.items)}</td>
      <td>{dayjs(order.created_at).format(`DD MMMM HH:mm`)}</td>
      <td>{order.address}</td>
      <td>{order.status}</td>
      <td>{ `${order.total} ${order.currency}`}</td>
    </tr>
  );
};

OrderHistoryItem.propTypes = {
  order: PropTypes.object.isRequired
};

export default OrderHistoryItem;
