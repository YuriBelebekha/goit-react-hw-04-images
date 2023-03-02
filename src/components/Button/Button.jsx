import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onloadMore }) => {
  return (
    <div className={css.ButtonBox}>
      <button
        type="button"
        className={css.ButtonLoadMore}
        onClick={onloadMore}
      >
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onloadMore: PropTypes.func,
}