const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
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
   state: {
      type: Boolean,
      default: false,
   },
   deadline: {
      type: Date,
      required: true,
      default: Date.now()
   },
   priority: {
      type: String,
      required: true,
      enum: ['Baja', 'Media', 'Alta']
   },
   project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
   }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
