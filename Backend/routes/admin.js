const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();



// These will go through isAuth middleware first and then to controller middleware

// /admin/add-project => GET
router.get('/add-project', isAuth, adminController.getAddProject);

// /admin/projects => GET
router.get('/projects', adminController.getProjects);

// /admin/add-project => POST
router.post('/add-project', isAuth, adminController.postAddProject);

// /admin/edit-project/:productId => GET 
router.get('/edit-project/:productId', isAuth, adminController.getEditProject);

// /admin/edit-project => POST
router.post('/edit-project',isAuth, adminController.postEditProject);

router.post('/delete-project',isAuth, adminController.postDeleteProject);

module.exports = router;
