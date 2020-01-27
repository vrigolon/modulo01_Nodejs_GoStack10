const express = require('express');

const server = express();

server.use(express.json())

// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Vitor", "email": "vrigolon@gmail.com" }

const users = ['Diego', 'Claudio', 'Victor']


server.use((req, res, next) => {
  console.log('A requisiçao foi chamada!')
  return next();
})

function checkUserExist(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required'})
  }
  return next();
}

function checkUserInArray(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: 'User does not exist'});
  }
}

server.get('/users', (req, res) => {
  return res.json(users);
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
})

server.post('/users', checkUserExist, (req, res) => {
  const { name } = req.body;

  users.push(name);
  return res.json(users)
})

server.put('/users/:index', checkUserInArray, checkUserExist, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  

  users [index] = name;

  return res.json(users);
})

server.delete('/users/:index', checkUserInArray, (req,res) => {
  const { index } = req.params;
  users.splice(index, 1)
  return res.json();

})


server.listen(3000);