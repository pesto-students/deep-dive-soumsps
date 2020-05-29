const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect('mongodb://localhost/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());
app.use(bodyParser.json());

//app.use(express.urlencoded({ extended: false }));

app.get('/todos', async (req, res) => {
  const todoList = await Todo.find();

  res.json(todoList);
});

app.post('/todo/add', async (req, res) => {
  let todo = new Todo({
    task: req.body.task,
    complete: req.body.complete,
  });

  try {
    todo = await todo.save();

    res.json({ todo, status: 'success' });
  } catch (err) {
    console.log(err);
    res.json({ status: 'failed' });
  }
});

app.post('/todo/update/:id', async (req, res) => {
  let todo = await Todo.findById(req.params.id);

  todo.task = req.body.task;
  todo.complete = req.body.complete;

  try {
    todo = await todo.save();

    res.json({ todo, status: 'success' });
  } catch (err) {
    console.log(err);
    res.json({ status: 'failed' });
  }
});

app.get('/todo/delete/:id', async (req, res) => {
  try {
    let todo = await Todo.findByIdAndDelete(req.params.id);
    res.json({ todo, status: 'success' });
  } catch (err) {
    res.json({ status: 'failed' });
  }
});

app.listen(5000, () => {
  console.log('listening to port 5000');
});
