import React, { Component } from 'react';
import TaskListContainer from '../../components/task-list-container/task-list-container.component';
import AddNewTaskContainer from '../../components/add-new-task-container/add-new-task-container.component';

import './homepage.styles.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      newTask: { task: '', complete: false },
    };

    this.onChangeTaskInputField = this.onChangeTaskInputField.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.handleDoneBtnClick = this.handleDoneBtnClick.bind(this);
  }

  generateID() {
    return '_' + Math.random().toString(36).substr(2, 6);
  }

  async addNewTask() {
    const currentTasks = this.state.taskList;
    const newTaskName = this.state.newTask.task;

    if (newTaskName !== '') {
      let response = await fetch('http://localhost:5000/todo/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(this.state.newTask),
      });
      let result = await response.json();

      if (result.status === 'success') {
        currentTasks.push(result.todo);
      }
      this.setState({ taskList: currentTasks });
    }
  }

  async handleDeleteBtnClick(event) {
    const currentTasks = this.state.taskList;
    const taskID = event.target.getAttribute('data-task-id');

    let response = await fetch(`http://localhost:5000/todo/delete/${taskID}`);
    let result = await response.json();

    if (result.status === 'success') {
      const newTaskList = currentTasks.filter((item) => item._id !== taskID);
      this.setState({ taskList: newTaskList });
    }
  }

  async handleDoneBtnClick(event) {
    const currentTasks = this.state.taskList;
    const taskID = event.target.getAttribute('data-task-id');
    const newTaskObj = {};

    currentTasks.forEach((item) => {
      if (item._id === taskID) {
        item.complete = true;
        newTaskObj.task = item.task;
        newTaskObj.complete = true;
      }
    });

    let response = await fetch(`http://localhost:5000/todo/update/${taskID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(newTaskObj),
    });
    let result = await response.json();

    if (result.status === 'success') {
      this.setState({ taskList: currentTasks });
    }
  }

  onChangeTaskInputField(inputText) {
    this.setState((state) => {
      return {
        newTask: { ...state.newTask, task: inputText },
      };
    });
  }

  async componentDidMount() {
    let response = await fetch('http://localhost:5000/todos');
    let result = await response.json();
    this.setState({ taskList: result });
  }

  render() {
    return (
      <div className="wrapper">
        <h3 className="page-title">Todo List</h3>

        <AddNewTaskContainer
          handleAddNewTaskBtnClick={this.addNewTask}
          onChangeTaskInputField={this.onChangeTaskInputField}
          inputFieldValue={this.state.newTask.task}
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
