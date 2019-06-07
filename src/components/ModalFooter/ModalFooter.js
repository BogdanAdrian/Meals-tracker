import React from 'react';
import PropTypes from 'prop-types';
import { SAVE, CANCEL, ALIGNMENT } from './constants';
import './ModalFooter.scss';

export default function ModalFooter({ onCancel, onConfirm, cancelCaption = CANCEL, confirmCaption = SAVE, disableConfirmButton = false, contentAlignment = ALIGNMENT.right }) {
  return (
    <footer className={`modal-footer ${contentAlignment}`}>
      <button
        className='cancel'
        onClick={onCancel}
      > {cancelCaption}
      </button>
      <button
        className='confirm'
        onClick={onConfirm}
        disabled={disableConfirmButton}
      >{confirmCaption}
      </button>
    </footer>
  );
}

ModalFooter.propTypes = {
  disableConfirmButton: PropTypes.bool,
  cancelCaption: PropTypes.string,
  confirmCaption: PropTypes.string,
  contentAlignment: PropTypes.oneOf([ALIGNMENT.left, ALIGNMENT.right, ALIGNMENT.center]).isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

ModalFooter.defaultProps = {
  contentAlignment: ALIGNMENT.right
};