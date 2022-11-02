
class Sockets {
   constructor(io) {
      this.io = io;

      this.socketsEvents();
   }

   socketsEvents() {
      this.io.on('connection', socket => {

         socket.on('open-project', projectId => {
            socket.join(projectId)
         });

         socket.on('new-task', data => {
            const project = data.project;

            socket.to(project).emit('task-added', data);
         });

         socket.on('delete-task', task => {
            const project = task.project;

            socket.to(project).emit('task-deleted', task);
         })

         socket.on('update-task', task => {
            const project = task.project;

            socket.to(project).emit('task-updated', task);
         })

         socket.on('set-state', task => {
            const project = task.project._id;

            socket.to(project).emit('task-state', task);
         })

      })
   }
}

module.exports = Sockets;
