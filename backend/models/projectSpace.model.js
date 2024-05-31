import mongoose from "mongoose";

const projectSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the creator
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for members
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProjectSpace = mongoose.model('ProjectSpace', projectSpaceSchema);

export default ProjectSpace;
