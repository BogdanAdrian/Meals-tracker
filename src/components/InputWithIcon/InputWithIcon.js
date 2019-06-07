import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './InputWithIcon.scss';

export default function InputWithIcon({ cls='', icon, inputProps }) {
  return (
    <div className={`input-with-icon ${cls}`}>
      <FontAwesomeIcon icon={icon}/>
      <input {...inputProps}/>
    </div>
  );
}