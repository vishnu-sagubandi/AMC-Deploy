const express = require('express');
const router = express.Router();
const Achievements = require('../models/achievements');
const markedown = require('marked');

router.get('/',async function(req,res,next){
    const members = await Achievements.find().sort({
        month_number:'desc'
    });
    res.render('achievements/achievements',{members:members,
        csrfToken: req.csrfToken()  });
})

router.get('/add',function(req,res,next){
    res.render('achievements/add',{team:new Achievements(),
        csrfToken: req.csrfToken()});
})


router.post('/', async function(req,res,next){
    req.team = new Achievements();
    next();
}, SaveAndRedirect('/db/achievements','achievements/add'))

router.put('/:id',async function(req,res,next){
    req.team = await Achievements.findById(req.params.id);
    next();
},SaveAndRedirect('/db/achievements','achievements/edit'))


router.delete('/:id',async function(req,res,next){
    await Achievements.findByIdAndDelete(req.params.id);
    res.redirect('/db/achievements');
})

router.get('/edit/:id',async function(req,res,next){
    const team = await Achievements.findById(req.params.id);
    res.render('achievements/edit',{team:team,
        csrfToken: req.csrfToken()});
})

function SaveAndRedirect(path1,path){
    return async function(req,res,next){
    let team = req.team
    team.name = req.body.name
    team.month = req.body.month
    team.year = req.body.year
    team.description = req.body.description
    team.month_number = (team.year - 2014)*12 + team.month
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