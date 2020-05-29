import React from 'react';
import './custom-button.styles.css';

const CustomButton = ({ children, onClickCallback, taskID, disabled, ...props }) => (
  <button
    className={`btn ${props.btnClass} ${disabled ? 'btn-disabled' : ''}`}
    data-task-id={taskID}
    onClick={(event) => onClickCallback(event)}
    disabled={disabled}
  >
    {children}
  </button>
);

export default CustomButton;
