const express = require('express');


// Write all your routes here
const postsRouter = require('./posts/post-router');
const usersRouter = require('./users/user-router');

const server = express();
server.use(express.json());
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);


server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!`});
});
module.exports = server;
