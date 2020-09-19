import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import {connect} from 'react-redux';
import {getProducts, getCurrency, getCurrencies} from "../../reducers/data/selectors";
import {ProductType} from '../../types/types';
import Spinner from '../spinner/spinner';


class Main extends React.PureComponent {

  render() {

    if (!this.props.currencies[this.props.currency]) {
      return <Spinner />;
    }
    const currencySymbol = this.props.currencies[this.props.currency].symbol;

    return (
      <div className="card-deck mb-4 text-center">
        { this.props.products.map((product) => <Card product={product} currencySymbol={currencySymbol} key={product.id} />)}
      </div>
    );
  }
}

Main.propTypes = {
  products: PropTypes.arrayOf(ProductType),
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
  currency: getCurrency(state),
  currencies: getCurrencies(state)
});

export {Main};
export default connect(mapStateToProps, null)(Main);
