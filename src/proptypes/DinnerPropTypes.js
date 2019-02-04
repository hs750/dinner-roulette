import PropTypes from 'prop-types';

const DinnerPropType = PropTypes.shape(
  {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  },
);

export default DinnerPropType;
