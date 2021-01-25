const express = require('express');
const router = express.Router();
const Alum = require('../models/alum');
const markedown = require('marked');

router.get('/',async function(req,res,next){
    const members = await Alum.find().sort({
        year:'asc'
    });
    res.render('alum/alum',{members:members,
        csrfToken: req.csrfToken()  });
})

router.get('/add',function(req,res,next){
    res.render('alum/add',{team:new Alum(),
        csrfToken: req.csrfToken()});
})


router.post('/', async function(req,res,next){
    req.team = new Alum();
    next();
}, SaveAndRedirect('/db/alum','alum/add'))

router.put('/:id',async function(req,res,next){
    req.team = await Alum.findById(req.params.id);
    next();
},SaveAndRedirect('/db/alum','alum/edit'))


router.delete('/:id',async function(req,res,next){
    await Alum.findByIdAndDelete(req.params.id);
    res.redirect('/db/alum');
})

router.get('/edit/:id',async function(req,res,next){
    const team = await Alum.findById(req.params.id);
    res.render('alum/edit',{team:team,
        csrfToken: req.csrfToken()});
})

function SaveAndRedirect(path1,path){
    return async function(req,res,next){
    let team = req.team
    team.name = req.body.name
    team.department = req.body.department
    team.degree = req.body.degree
    team.year = req.body.year
    team.por = req.body.por
    team.profession = req.body.profession
    team.photo = req.body.photo
    team.facebook = req.body.facebook
    team.instagram = req.body.instagram
    team.linkedin = req.body.linkedin
    team.portfolio = req.body.portfolio
    try{
        team = await team.save();
        res.redirect(path1);
    } catch(err){
        console.log(err);
        res.render(`${path}`,{team:team,
            csrfToken: req.csrfToken()});
        }
    }
}
module.exports = router;