const express = require('express');
const { param } = require('express-validator');
const { deleteTask, getTask, newTask, setState, updateTask } = require('../controllers/task_controller.js');
const { checkAuth, validateFields } = require('../middlewares/index.js');
const router = express.Router();

router.use(checkAuth);

router.post('/', newTask);

router.get('/:id', [
   param('id', 'El proyecto no existe').isMongoId(),
   validateFields
], getTask);

router.put('/:id', [
   param('id', 'El proyecto no existe').isMongoId(),
   validateFields
], updateTask);

router.delete('/:id', [
   param('id', 'El proyecto no existe').isMongoId(),
   validateFields
], deleteTask);

router.post('/state/:id', [
   param('id', 'El proyecto no existe').isMongoId(),
   validateFields
], setState);

module.exports = router;