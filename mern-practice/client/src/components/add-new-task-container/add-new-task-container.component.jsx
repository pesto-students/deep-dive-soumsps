import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import CustomInputField from '../custom-input-field/custom-input-field.component';
import './add-new-task-container.styles.css';

const AddNewTaskContainer = ({
  handleAddNewTaskBtnClick,
  onChangeTaskInputField,
  inputFieldValue,
}) => (
  <div className="add-new-task-form">
    <label className="form-label">Enter your task below</label>
    <div style={{ display: 'flex' }}>
      <CustomInputField
        type={'text'}
        name={'new-task'}
        placeholder={''}
        onChangeCallback={onChangeTaskInputField}
        inputFieldValue={inputFieldValue}
      />
      <CustomButton btnClass={'btn-primary'} onClickCallback={handleAddNewTaskBtnClick}>
        Add Task
      </CustomButton>
    </div>
  </div>
);

export default AddNewTaskContainer;
