import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import './ModalHeader.scss';

library.add(faTimes);

export default function ModalHeader({ title, onClose }) {
  return (
    <header className='modal-header'>
      <h2 className="title">{title}</h2>
      {onClose && (
        <FontAwesomeIcon
          className="close-button"
          icon="times"
          onClick={onClose}
        />
      )}
    </header>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func
};