import PropTypes from 'prop-types';
import s from './Button.module.css';

export const Button = ({ handleLoadMore }) => {
  return (
    <button type="button" className={s.btn} onClick={handleLoadMore}>
      Load more
    </button>
  );
};
Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
