import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import './SelectWithLabel.scss';

const { Option } = Select;

function SelectWithLabel({ defaultValue, options, disabled, label, onChange}) {
  return (
    <div className='select-with-label'>
      <label>{label}</label>
      <Select
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <Option key={index} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  )
}
  
SelectWithLabel.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired
};

export default SelectWithLabel;
