const Project = require('../models/project'); //Importing project model


//Getting Add Project page
exports.getAddProject = (req, res, next) => {

  res.render('admin/edit-project', {
    pageTitle: 'Add Project',
    path: '/db/admin/add-project',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

//Posting Added Project
exports.postAddProject = (req, res, next) => {

  //fetching data fields from request
  const title = req.body.title;
  const type = req.body.type;
  const imageUrl = req.body.imageUrl;
  const longDescription = req.body.longDescription;
  const description = req.body.description;

  //Here, we map different values we defined in our schema.
  const project = new Project({
    title: title,    //key defined in schema : keys we received through req.
    type: type, 
    imageUrl: imageUrl, 
    description: description,
    longDescription: longDescription, 
    userId: req.user
  });
  //project created

  //saving created project model.
  project
    .save() //method provided by mongoose
    .then(result => {
      // console.log(result);
      console.log('Created Project');
      res.redirect('/db/admin/projects');
    })
    .catch(err => {
      console.log(err);
    });
};

//Getting edit project page
exports.getEditProject = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  //an ID is assigned to each project we save(). Here, we are extracting that ID.
  const prodId = req.params.productId; 

  //Fetching single project
  Project.findById(prodId)
    .then(project => {
      //if not found
      if (!project) {
        return res.redirect('/');
      }
      res.render('admin/edit-project', {
        pageTitle: 'Edit Project',
        path: '/db/admin/edit-project',
        editing: editMode,
        project: project,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

//Update project
exports.postEditProject = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedType = req.body.type;
  const updatedLongDescription = req.body.longDescription;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  //finding project by id.
  Project.findById(prodId)
    .then(project => {
      
      project.title = updatedTitle;
      project.type = updatedType;
       project.imageUrl = updatedImageUrl;
       project.description = updatedDesc;
       project.longDescription = updatedLongDescription;
       
      return project.save(); //save updated project
    })
    .then(result => {
      console.log('UPDATED PROJECT!');
      res.redirect('/db/admin/projects');
    })
    .catch(err => console.log(err));
};

//Getting Admin projects page.
exports.getProjects = (req, res, next) => {
  Project.find()
    .then(projects => {
      console.log(projects);
      res.render('admin/projects', {
        prods: projects,
        pageTitle: 'Admin Projects',
        path: '/db/admin/projects',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};


//Delete a project
exports.postDeleteProject = (req, res, next) => {
  const prodId = req.body.productId;


  Project.findByIdAndRemove(prodId) //method by mongoose
    .then(() => {
      console.log('DESTROYED PROJECT');
      res.redirect('/db/admin/projects');
    })
    .catch(err => console.log(err));
};
