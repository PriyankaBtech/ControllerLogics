// controllers/todoController.js
const Todo = require('../models/todo');

// Error handling middleware
const handleError = (res, statusCode, message) => {
    res.status(statusCode).json({ message });
};

// Controller for creating a new todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description });
    // const todo = await Todo.create(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

// Controller for getting all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    handleError(res, 500, err.message);
  }
};

// Controller for getting a single todo
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return handleError(res, 404, 'Todo not found');
    }
    res.json(todo);
  } catch (err) {
    handleError(res, 500, err.message);
  }
};

// Controller for updating a todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        return handleError(res, 404, 'Todo not found');
    }
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

// Controller for deleting a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return handleError(res, 404, 'Todo not found');
    }
    await todo.remove();
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    handleError(res, 500, err.message);
  }
};


// Middleware to find todo by id
exports.findTodoById = async (req, res, next) => {
    let todo;
    try {
      todo = await Todo.findById(req.params.id);
      if (!todo) {
        return handleError(res, 404, 'Todo not found');
      }
    } catch (err) {
      return handleError(res, 500, err.message);
    }
    req.todo = todo;
    next();
};
// Note : middleware, reducing code duplication.

