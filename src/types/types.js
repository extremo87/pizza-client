import PropTypes from 'prop-types';

export const ProductType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
});
