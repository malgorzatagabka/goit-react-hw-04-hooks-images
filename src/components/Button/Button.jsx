import PropTypes from 'prop-types';
import style from './Button.module.css'

export const Button = ({ handleMoreImage }) => {
  return (
    <button type="button" className={style.Button } onClick={() => handleMoreImage()}>
      Load more
    </button>
  );
};

Button.propTypes = {
  handleMoreImage: PropTypes.func.isRequired,
};
