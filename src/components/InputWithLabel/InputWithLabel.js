import React from 'react';
import PropTypes from 'prop-types';
import './InputWithLabel.scss';

class InputWithLabel extends React.Component {
  static propTypes = {
    inputProps: PropTypes.object,
    label: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className='input-with-label'>
        <label>{this.props.label}</label>
        <input {...this.props.inputProps}/>
      </div>
    );
  }
}

export default InputWithLabel;
