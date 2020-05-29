import React, { Component } from 'react';
import TaskListContainer from '../../components/task-list-container/task-list-container.component';
import AddNewTaskContainer from '../../components/add-new-task-container/add-new-task-container.component';

import './homepage.styles.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: [
        { id: '_l4wnop', name: 'Evening Workout', isCompleted: false },
        { id: '_l4wsy2', name: 'Do something', isCompleted: false },
        { id: '_l65212', name: 'Sleep atleast for 10hours', isCompleted: false },
      ],
      newTask: { name: '', isCompleted: false },
    };

    this.onChangeTaskInputField = this.onChangeTaskInputField.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.handleDoneBtnClick = this.handleDoneBtnClick.bind(this);
  }

  generateID() {
    return '_' + Math.random().toString(36).substr(2, 6);
  }

  addNewTask() {
    const currentTasks = this.state.taskList;
    const newTaskName = this.state.newTask.name;

    if (newTaskName !== '') {
      currentTasks.push({
        id: this.generateID(),
        name: newTaskName,
        isCompleted: false,
      });

      this.setState({ taskList: currentTasks });
      this.setState({
        newTask: { name: '', isCompleted: false },
      });
    }
  }

  handleDeleteBtnClick(event) {
    const currentTasks = this.state.taskList;
    const taskID = event.target.getAttribute('data-task-id');
    console.log('delete button clicked', taskID);
    const newTaskList = currentTasks.filter((item) => item.id !== taskID);
    console.log(newTaskList);
    this.setState({ taskList: newTaskList });
  }

  handleDoneBtnClick(event) {
    const currentTasks = this.state.taskList;
    const taskID = event.target.getAttribute('data-task-id');
    console.log('done button clicked', taskID);
    currentTasks.forEach((item) => {
      if (item.id === taskID) {
        item.isCompleted = true;
      }
    });

    this.setState({ taskList: currentTasks });
  }

  onChangeTaskInputField(inputText) {
    this.setState((state) => {
      return {
        newTask: {
          name: inputText,
        },
      };
    });
  }

  render() {
    return (
      <div className="wrapper">
        <h3 className="page-title">Todo List</h3>

        <AddNewTaskContainer
          handleAddNewTaskBtnClick={this.addNewTask}
          onChangeTaskInputField={this.onChangeTaskInputField}
          inputFieldValue={this.state.newTask.name}
        />
        <TaskListContainer
          taskList={this.state.taskList}
          handleDoneBtnClick={this.handleDoneBtnClick}
          handleDeleteBtnClick={this.handleDeleteBtnClick}
        />
      </div>
    );
  }
}

export default HomePage;
