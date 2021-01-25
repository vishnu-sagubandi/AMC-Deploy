const express = require('express');
const router = express.Router();
const Events = require('../models/events');
const markedown = require('marked');

router.get('/',async function(req,res,next){
    const members = await Events.find().sort({
        year:'desc',
        month:'desc',
        date:'desc',
        time:'desc'
    });
    res.render('events/events',{members:members,
        csrfToken: req.csrfToken()  });
})

router.get('/add',function(req,res,next){
    res.render('events/add',{team:new Events(),
        csrfToken: req.csrfToken()});
})


router.post('/', async function(req,res,next){
    req.team = new Events();
    next();
}, SaveAndRedirect('/db/events','events/add'))

router.put('/:id',async function(req,res,next){
    req.team = await Events.findById(req.params.id);
    next();
},SaveAndRedirect('/db/events','events/edit'))


router.delete('/:id',async function(req,res,next){
    await Events.findByIdAndDelete(req.params.id);
    res.redirect('/db/events');
})

router.get('/edit/:id',async function(req,res,next){
    const team = await Events.findById(req.params.id);
    res.render('events/edit',{team:team,
        csrfToken: req.csrfToken()});
})

function SaveAndRedirect(path1,path){
    return async function(req,res,next){
    let team = req.team
    team.name = req.body.name
    team.date = req.body.date
    team.month = req.body.month
    team.year = req.body.year
    team.day = req.body.day
    team.time = req.body.time
    team.description = req.body.description
    team.venue = req.body.venue
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