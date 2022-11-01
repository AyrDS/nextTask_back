const Project = require('../models/project_model');
const User = require('../models/user_model');

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

const addCollaborator = async (req, res) => {

   const { email } = req.body;

   try {
      const project = await Project.findById(req.params.id);

      if (!project) {
         return res.status(404).json({ msg: 'Proyecto no encontrado.' });
      }

      if (project.author.toString() !== req.user._id.toString()) {
         return res.status(401).json({ msg: 'Acción no válida.' });
      }

      const user = await User.findOne({ email }).select('-confirmed -createdAt -token -updatedAt ');

      if (!user) {
         return res.status(404).json({ msg: 'Usuario no encontrado.' })
      }

      if (project.author.toString() === user._id.toString()) {
         return res.status(400).json({ msg: 'El creador del proyecto no puede ser colaborador.' })
      }

      if (project.collaborators.includes(user._id)) {
         return res.status(400).json({ msg: 'El usuario ya pertenece al proyecto.' });
      }

      project.collaborators.push(user._id);
      await project.save();
      res.json({ msg: 'Colaborador agregado correctamente' });
   } catch (error) {

   }
}

const searchCollaborator = async (req, res) => {
   const { email } = req.body;

   try {
      const user = await User.findOne({ email }).select('-confirmed -createdAt -token -updatedAt ');

      if (!user) {
         return res.status(404).json({ msg: 'Usuario no encontrado' })
      }

      res.json(user);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Error inesperado'
      });
   }
}

const deleteCollaborator = async (req, res) => {

}


module.exports = {
   deleteCollaborator,
   deleteProjects,
   editProject,
   getProject,
   getProjects,
   addCollaborator,
   newProject,
   searchCollaborator,
}
