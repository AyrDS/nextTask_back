const Project = require('../models/project_model');
const Task = require('../models/task_model');

const getProjects = async (req, res) => {
   const projects = await Project.find().where('author').equals(req.user).select('-tasks');

   res.json(projects);
}

const newProject = async (req, res) => {

   const project = new Project(req.body);
   project.author = req.user._id;

   try {
      await project.save();

      res.status(201).json(project);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }

}

const getProject = async (req, res) => {
   const { id } = req.params;

   try {
      const project = await Project.findById(id).populate('tasks');

      if (!project) {
         return res.status(404).json({ msg: 'El proyecto no existe' });
      }

      if (project.author.toString() !== req.user._id.toString()) {
         return res.status(401).json({ msg: 'No tienes los permisos necesarios para acceder' });
      }

      res.json(project);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

const editProject = async (req, res) => {
   const { id } = req.params;

   try {
      const project = await Project.findById(id);

      if (!project) {
         return res.status(404).json({ msg: 'El proyecto no existe' });
      }

      if (project.author.toString() !== req.user._id.toString()) {
         return res.status(401).json({ msg: 'No tienes los permisos necesarios para acceder' });
      }

      const updateProject = await Project.findByIdAndUpdate(id, req.body, { new: true });

      res.json(updateProject);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

const deleteProjects = async (req, res) => {
   const { id } = req.params;

   try {
      const project = await Project.findById(id);

      if (!project) {
         return res.status(404).json({ msg: 'El proyecto no existe' });
      }

      if (project.author.toString() !== req.user._id.toString()) {
         return res.status(401).json({ msg: 'No tienes los permisos necesarios para acceder' });
      }

      await Project.findByIdAndDelete(id);

      res.json({ msg: 'Proyecto eliminado' });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

const newCollaborator = async (req, res) => {

}

const deleteCollaborator = async (req, res) => {

}


module.exports = {
   deleteCollaborator,
   deleteProjects,
   editProject,
   getProject,
   getProjects,
   newCollaborator,
   newProject,
}
