const express = require('express');
const cors = require('cors');
const dbConnection = require('../db/config.js');
const usersRoutes = require('../routes/user_routes.js');
const projectRoutes = require('../routes/project_routes.js');
const tasksRoutes = require('../routes/task_routes.js');

class Server {

   constructor() {
      this.app = express();
      this.port = process.env.PORT;
      this.paths = {
         usersPath: '/api/users',
         projectPath: '/api/projects',
         taskPath: '/api/tasks'
      };
   }

   async connectDB() {
      await dbConnection();
   }

   middlewares() {
      this.app.use(express.json());

      this.app.use(cors());

      this.app.use(this.paths.usersPath, usersRoutes);
      this.app.use(this.paths.projectPath, projectRoutes);
      this.app.use(this.paths.taskPath, tasksRoutes);
   }

   execute() {
      this.connectDB();

      this.middlewares();

      this.app.listen(this.port, () => {
         console.log(`Server corriendo en puerto ${this.port}`);
      });
   }
}

module.exports = Server;