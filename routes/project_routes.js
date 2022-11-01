const express = require('express');
const { param } = require('express-validator');
const { deleteCollaborator, deleteProjects, editProject, getProject, getProjects, addCollaborator, newProject, searchCollaborator } = require('../controllers/project_controller.js');
const { checkAuth, validateFields } = require('../middlewares');
const router = express.Router();

router.use(checkAuth);

router.get('/', getProjects);
router.post('/', newProject);

router.get('/:id', [
   param('id', 'El proyecto no existe').isMongoId(),
   validateFields
], getProject);

router.put('/:id', [
   param('id', 'El proyecto no existe').isMongoId(),
   validateFields
], editProject);

router.delete('/:id', [
   param('id', 'El proyecto no existe').isMongoId(),
   validateFields
], deleteProjects);

router.post('/collaborators', searchCollaborator)

router.post('/collaborators/:id', [
   param('id', 'El proyecto no existe').isMongoId(),
   validateFields
], addCollaborator);

router.post('/del-collaborators/:id', [
   param('id', 'El proyecto no existe').isMongoId(),
   validateFields
], deleteCollaborator);

module.exports = router;
