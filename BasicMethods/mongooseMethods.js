// 1. find() 

// => method is used to retrieve multiple documents from a collection that match a given query.
const todos = await Todo.find({ completed: false });
// this will find all todos where the completed field is false.


// 2. findOne()

// =>  method is used to retrieve a single document
const todo = await Todo.findOne({ _id: todoId });
// this will find the todo with the specified _id.


// 3. create()

// => method is used to create a new document
const newTodo = await Todo.create({
    title: 'Complete assignment',
    description: 'Finish the project by Friday',
    completed: false
});
//this will create a new todo document with the provided data


// 4. updateOne()

// => method is used to update a single document
const result = await Todo.updateOne({ _id: todoId }, { completed: true });
// this will update the todo with the specified _id, setting its completed field to true


// 5. deleteOne()

// =>  method is used to delete a single document
const result = await Todo.deleteOne({ _id: todoId });
// this will delete the todo with the specified _id

  

