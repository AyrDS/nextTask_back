require('dotenv').config();
const Server = require('./models/server_model.js');

const server = new Server();
server.execute();
