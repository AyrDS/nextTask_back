const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: true
   },
   description: {
      type: String,
      trim: true,
      required: true
   },
   deadline: {
      type: Date,
      default: Date.now(),
   },
   client: {
      type: String,
      trim: true,
      required: true
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   tasks: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Task'
      }
   ],
   collaborators: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      }
   ],
}, {
   timestamps: true
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
