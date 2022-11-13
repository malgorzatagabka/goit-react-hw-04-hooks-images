import React from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

export default class Modal extends React.Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = key => {
    if (key.code === 'Escape') {
      this.props.closeModal();
    }
  };

  backdropOnClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
   
    }
  };

  render() {
    const { modalImage, tags } = this.props;
    return (
      <div className={style.overlay} onClick={this.backdropOnClick}>
        <div className={style.Modal}>
          <img src={modalImage} className={style.modalImg} alt={tags} />
        </div>
      </div>
    );
  }
}


Modal.propTypes = {
  handleKeyPress: PropTypes.func.isRequired,
  backdropOnClick: PropTypes.func.isRequired,
};