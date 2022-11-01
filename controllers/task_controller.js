const Project = require('../models/project_model.js');
const Task = require('../models/task_model.js');

const newTask = async (req, res) => {
   const { project: projectID } = req.body;

   try {
      const project = await Project.findById(projectID);

      if (!project) {
         return res.status(404).json({ msg: 'El proyecto no existe' });
      }

      if (project.author.toString() !== req.user._id.toString()) {
         return res.status(403).json({ msg: 'No tienes los permisos necesarios' });
      }

      const newTask = new Task(req.body);
      await newTask.save();
      project.tasks.push(newTask._id);
      await project.save();

      res.status(201).json(newTask);

   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }

}

const getTask = async (req, res) => {
   const { id } = req.params;

   try {
      const task = await Task.findById(id).populate('project');
      console.log(task);

      if (!task) {
         return res.status(404).json({ msg: 'La tarea no existe' });
      }

      if (task.project.author.toString() !== req.user._id.toString()) {
         return res.status(403).json({ msg: 'Acción inválida' });
      }

      res.json(task);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }

}

const updateTask = async (req, res) => {
   const { id } = req.params;

   try {
      const task = await Task.findById(id).populate('project');

      if (!task) {
         return res.status(404).json({ msg: 'La tarea no existe' });
      }

      if (task.project.author.toString() !== req.user._id.toString()) {
         return res.status(403).json({ msg: 'No tienes los permisos necesarios' });
      }

      const taskUpdate = await Task.findByIdAndUpdate(id, req.body, { new: true });

      res.json(taskUpdate);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

const deleteTask = async (req, res) => {
   const { id } = req.params;

   try {
      const task = await Task.findById(id).populate('project');

      if (!task) {
         return res.status(404).json({ msg: 'La tarea no existe' });
      }

      if (task.project.author.toString() !== req.user._id.toString()) {
         return res.status(403).json({ msg: 'No tienes los permisos necesarios' });
      }

      const project = await Project.findById(task.project);
      project.tasks.pull(task._id);

      await Promise.all([await project.save(), await Task.findByIdAndDelete(id)]);

      res.json({ msg: 'Tarea eliminada' });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

const setState = async (req, res) => {
   const { id } = req.params;

   try {
      const task = await Task.findById(id).populate('project');

      if (!task) {
         return res.status(404).json({ msg: 'La tarea no existe' });
      }

      if (task.project.author.toString() !== req.user._id.toString() && !task.project.collaborators.some(colab => colab._id.toString() === req.user._id.toString())) {
         return res.status(403).json({ msg: 'No tienes los permisos necesarios' });
      }

      task.state = !task.state;
      await task.save();

      res.json(task);

   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

module.exports = {
   deleteTask,
   getTask,
   newTask,
   setState,
   updateTask,
}
