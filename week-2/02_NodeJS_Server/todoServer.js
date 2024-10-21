const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
const PORT = 3001;
const todos = [
  {
    id: "1",
    title: "Mediiation",
    completed:"false",
    description: "Mediiation asdfaslkhbfhaskdasdasdasdfaswdf",
  },
  {
    id: "2",
    title: "Drink water",
    completed:"false",
    description: "Drink water asdfaslkhbfhaskdasdasdasdfaswdf",
  },
  {
    id: "3",
    title: "Freshen up",
    completed:"false",
    description: "Freshen up asdfaslkhbfhaskdasdasdasdfaswdf",
  },
  {
    id: "4",
    title: "2 hr cohort live",
    completed:"false",
    description: "2 hr cohort live asdfaslkhbfhaskdasdasdasdfaswdf",
  },
  {
    id: "5",
    title: "1 hr DSA",
    completed:"false",
    description: "1 hr DSA asdfaslkhbfhaskdasdasdasdfaswdf",
  },
  {
    id: "6",
    title: "Office Work",
    completed:"false",
    description: "1 hr asdfaslkhbfhaskdasdasdasdfaswdf",
  },
];

app.get("/todos", (req, res) => res.status(200).json(todos));

app.get("/todos/:id", (req, res) => {
  const task = todos.find((todo)=> todo.id === req.params.id);
  task?res.status(200).json(task):res.status(404).send("Oops! the given todo is not found")
});

// POST /todos - Create a new todo item
//    Description: Creates a new todo item.
//    Request Body: JSON object representing the todo item.
//    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
//    Example: POST http://localhost:3000/todos
//    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
app.post('/todos', (req,res)=>{
  const {title, description, completed} = req.body;
  
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    completed,
  }
  todos.push(newTask)
  console.log(todos)
  if(req.body) res.status(201).send("Created with the ID of the created todo item in JSON format")
})

// PUT /todos/:id - Update an existing todo item by ID
// Description: Updates an existing todo item identified by its ID.
// Request Body: JSON object representing the updated todo item.
// Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
// Example: PUT http://localhost:3000/todos/123
// Request Body: { "title": "Buy groceries", "completed": true }

app.put("/todos/:id", (req,res)=>{
  //pehle body se id chaiye
  //then id ko check krenge hai ki nahi
  //agar hai then update 
  //else 404
  const {title, description, completed} = req.body;
  const updateIndex = todos.findIndex(e => e.id === req.params.id);
  if(updateIndex !== -1){
    const taskToBeUpdated = todos[updateIndex];
    taskToBeUpdated.title = req.body.title,
    taskToBeUpdated.completed = req.body.completed,
    taskToBeUpdated.description = req.body.description
    res.status(200).send("updated")
    console.log(todos);

  }
  else{
    res.status(404).send("The task you want to update is not found")
    }
  
})

module.exports = app;
app.listen(PORT);
