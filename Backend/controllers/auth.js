const bcrypt = require('bcryptjs'); //for encrypting passwords

const User = require('../models/user');


//get login page
exports.getLogin = (req, res, next) => {

  //Flash Box bug fix
  let message = req.flash('error')
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  //render login page
  res.render('auth/login', {
    path: '/db/login',
    pageTitle: 'Login',
    isAuthenticated: false, //storing info if the user is authenticated or not (false by default)

    errorMessage: message //false login credentials (storing error msg)

    //Original flash message code-
    // errorMessage: req.flash('error') //to store flashed error in const var. flash err will be removed from session after flashing.
  });
};

//get signup page
exports.getSignup = (req, res, next) => {

  let message = req.flash('error')
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/signup', {
    path: '/db/signupsignup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    errorMessage: message
  });
};

// post login data or authentication
exports.postLogin = (req, res, next) => {

  //get the data from form.
  const email = req.body.email;
  const password = req.body.password;

  //check if email matches with database
  User.findOne({email: email})
    .then(user => {
      //If email is not found.
      if(!user) {

        //if email doesnt match flash error msg

        req.flash('error', 'Inavlid email or password')

        return res.redirect('/db/login');
      }
      //Else compare password (if email matches)

      //function for comparing hashed password
      bcrypt.compare(password, user.password).then(doMatch => {

        //If password matches
        if(doMatch) {
          //storing session info.
          req.session.isLoggedIn = true; 
          req.session.user = user;

          //saving session info.
         return req.session.save(err => {
            console.log(err);
           res.redirect('/db');
          });
          
        }
        //Else flash error
        req.flash('error', 'Inavlid email or password')
        res.redirect('/db/login');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/db/login');
      })
     
    })
    .catch(err => console.log(err));
};

//Signing up user
exports.postSignup = (req, res, next) => {

  //getting signup data.
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  //Check if email already exists!
  User.findOne({email: email})
  .then(userDoc => {

    //If email already exists
    if(userDoc) {
      req.flash('error', 'E-mail exists already!')
      return res.redirect('/db/signupsignup');
    }
    //Else
    //Encrypt the password
    return bcrypt.hash(password, 12)
     .then(hashedPassword => {

       //Create new user
        const user = new User ({
        email:email,
        password: hashedPassword
      });
      //save user in database
      return user.save();
    })
    .then( result => {
      //Redirect to login page.
      res.redirect('/db/login');
    }
    );

    
  })
 
  .catch(err => {
    console.log(err);
  });

};

//Deleting session after logging out
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/db');
  });
};
