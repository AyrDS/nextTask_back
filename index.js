const dotenv = require('dotenv');
const Server = require('./models/server_model.js');
dotenv.config();

const server = new Server();
server.execute();
