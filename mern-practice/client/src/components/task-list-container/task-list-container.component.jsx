import React from 'react';
import Task from '../task/task.component';
import './task-list-container.styles.css';

const TaskListContainer = ({ taskList, handleDoneBtnClick, handleDeleteBtnClick }) => {
  return (
    <ul className="task-list-container">
      {taskList.map((item, key) => (
        <Task
          key={key}
          id={item._id}
          name={item.task}
          isCompleted={item.complete}
          handleDoneBtnClick={handleDoneBtnClick}
          handleDeleteBtnClick={handleDeleteBtnClick}
        />
      ))}
    </ul>
  );
};

export default TaskListContainer;
