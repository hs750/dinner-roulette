import PropTypes from 'prop-types';

const HistoryPropType = PropTypes.shape(
  {
    push: PropTypes.func.isRequired,
  },
);

export default HistoryPropType;
