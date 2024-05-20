import ProjectSpace from '../models/projectSpace.model.js';

const createProjectSpace = async (req, res) => { // Controller to create new Project Space
  try {
    const { name, description, createdBy } = req.body;
    const newProjectSpace = await ProjectSpace.create({
      name,
      description,
      createdBy,
    });
    res.status(201).json(newProjectSpace);
  } catch (error) {
    console.error('Error creating project space:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProjectSpaces = async (req, res) => { // Controller to fetch projectspace
    try {
      const userId = req.params.userId
      const projectSpaces = await ProjectSpace.find({ createdBy: userId})
      res.status(200).json(projectSpaces);
    } catch (error) {
      console.error('Error fetching project spaces:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getProjectSpace = async (req, res) => { // Controller to fetch particular projectspace 
    try {
      const projectId = req._id
      const projectSpace = await ProjectSpace.find({ createdBy: projectId})
      res.status(200).json(projectSpace);
    } catch (error) {
      console.error('Error fetching the particular project space :', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// Other controller methods for fetching, updating, deleting project spaces, etc.

export { createProjectSpace,  getProjectSpaces,  getProjectSpace,};