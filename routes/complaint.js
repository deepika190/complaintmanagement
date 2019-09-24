var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('complaint.ejs', {title: 'complaint'});

});



module.exports = router;