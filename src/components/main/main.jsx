import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import {connect} from 'react-redux';
import {getProducts} from "../../reducers/data/selectors";
import {ProductType} from '../../types/types';


class Main extends React.PureComponent {

  render() {

    return (
      <div className="card-deck mb-4 text-center">
        { this.props.products.map((product) => <Card product={product} key={product.id} />)}
      </div>
    );
  }
}

Main.propTypes = {
  products: PropTypes.arrayOf(ProductType)
};

const mapStateToProps = (state) => ({
  products: getProducts(state)
});

export {Main};
export default connect(mapStateToProps, null)(Main);
