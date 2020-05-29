import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './task.styles.css';

const Task = ({ id, name, isCompleted, handleDoneBtnClick, handleDeleteBtnClick }) => (
  <li className="task-container">
    <div className="task-description">
      <span className="task-name">{name}</span>
      {isCompleted ? (
        <span className={`task-completion-badge badge-success`}>Done</span>
      ) : (
        <span className={`task-completion-badge badge-danger`}>Not done</span>
      )}
    </div>
    <div className="task-actions">
      <CustomButton
        btnClass={' btn-done'}
        taskID={id}
        onClickCallback={handleDoneBtnClick}
        disabled={isCompleted}
      >
        Done
      </CustomButton>
      <CustomButton
        btnClass={' btn-delete'}
        taskID={id}
        onClickCallback={handleDeleteBtnClick}
      >
        Delete
      </CustomButton>
    </div>
  </li>
);

export default Task;
