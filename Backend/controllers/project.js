const Project = require('../models/project');

//fetching all projects(main page)
exports.getProjects = (req, res, next) => {
  
  Project.find() //mongoose method. It returns an array
    .then(projects => {
      console.log(projects); //array of projects
      res.render('project/project-list', {
        prods: projects,
        pageTitle: 'All Projects',
        path: '/db/projects',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//fetching single project (details section)
exports.getProject = (req, res, next) => {
  
  const prodId = req.params.productId;

  //Project is a mongoose model and mongoose has a findById method
  Project.findById(prodId)
    .then(project => {
      res.render('project/project-detail', {
        project: project,
        pageTitle: project.title,
        path: '/db/projects',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

//fetching all projects
exports.getIndex = (req, res, next) => {
  Project.find()
    .then(projects => {
      res.render('project/index', {
        prods: projects,
        pageTitle: 'AMC Database',
        path: '/db/projects',
        
      });
    })
    .catch(err => {
      console.log(err);
    });
};

