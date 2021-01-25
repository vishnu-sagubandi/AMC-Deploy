const path = require('path');

const express = require('express');

const projectController = require('../controllers/project');
const isAuth = require('../middleware/is-auth');
const router = express.Router();


// getting home page
router.get('/db', projectController.getIndex);

// getting home page
router.get('/db/projects', projectController.getProjects);

// getting a single project(details page)
router.get('/db/projects/:productId', projectController.getProject);



module.exports = router;
