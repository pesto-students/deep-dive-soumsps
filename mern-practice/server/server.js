const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/todo-app', { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true });

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.get('/todos', async (req, res) => {
	// res.send('testing');

	const todoList = await Todo.find();

	res.json(todoList);
});

app.post('/todo/add', async (req, res) => {
	let todo = new Todo({
		task: req.body.task,
		complete: req.body.complete
	});

	try {
		todo = await todo.save();
		// status = 'success';
		// console.log('Success' )
		res.json({todo, status: 'success'})
	} catch(err) {
		// status = 'fail';
		console.log(err);
		res.json({status: 'failed'});
	}
});

app.post('/todo/update/:id', async (req, res) => {
	let todo = await Todo.findById(req.params.id);

	todo.task = req.body.task;
	todo.complete = req.body.complete;

	try {
		todo = await todo.save();
		// status = 'success';
		// console.log('Success' )
		res.json({todo, status: 'success'})
	} catch(err) {
		// status = 'fail';
		console.log(err);
		res.json({status: 'failed'});
	}
	// console.log(todo);
});

app.get('/todo/delete/:id', async (req, res) => {
	
	
	try {
		let todo = await Todo.findByIdAndDelete(req.params.id);
		res.json({todo, status: 'success'})
	} catch(err) {
		res.json({status: 'failed'});
	}
});




// var express    = require('express')
// var bodyParser = require('body-parser')
// var app = express()
// // parse application/json
// app.use(bodyParser.json())
// app.use(function (req, res, next) {
//   console.log(req.body) // populated!
//   next()
// })

app.listen(5000);

