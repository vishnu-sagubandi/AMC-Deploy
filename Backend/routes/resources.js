const express = require('express');
const router = express.Router();
const Resources = require('../models/resources');
const markedown = require('marked');

router.get('/',async function(req,res,next){
    const members = await Resources.find().sort({
        date:'desc'
    });
    res.render('resources/resources',{members:members,
        csrfToken: req.csrfToken()});
})

router.get('/add',function(req,res,next){
    res.render('resources/add',{resource:new Resources(),
        csrfToken: req.csrfToken()});
})


router.post('/', async function(req,res,next){
    req.resource = new Resources();
    next();
}, SaveAndRedirect('/db/resources','resources/add'))

router.put('/:id',async function(req,res,next){
    req.resource = await Resources.findById(req.params.id);
    next();
},SaveAndRedirect('/db/resources','resources/edit'))

router.delete('/:id',async function(req,res,next){
    await Resources.findByIdAndDelete(req.params.id);
    res.redirect('/db/resources');
})

router.get('/edit/:id',async function(req,res,next){
    const resource = await Resources.findById(req.params.id);
    res.render('resources/edit',{resource:resource,
        csrfToken: req.csrfToken()});
})

function SaveAndRedirect(path1,path){
    return async function(req,res,next){
    let resource = req.resource
    resource.name = req.body.name,
    resource.type = req.body.type,
    resource.drive_link = req.body.drive_link
    resource.youtube_link = req.body.youtube_link
    try{
        resource = await resource.save();
        res.redirect(path1);
    } catch(err){
        console.log(err);
        res.render(`${path}`,{resource:resource,
            csrfToken: req.csrfToken()});
        }
    }
}
module.exports = router;