var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('empcomplaint.ejs', {title: 'complaint'});

});




router.get('/', function(req,res,next){
    var currentuser = req.session.user;
    console.log(currentuser);
    let selectquery;
    switch (currentuser.role) {
        case "app": {
                selectquery ="select * from complaint where comtype='application'";
            break;
        }
        case "tech": {
            selectquery ="select * from complaint where comtype='technical'";
            //filter = filter + "technical')";
            break;
        }
        case "hr":{
            selectquery="select * from complaint where comtype='HR'";
            break;
        }

        case "finance":{
          selectquery="select * from complaint where comtype='finance'";
            break;
        }
        default:{

            
            selectquery="select * from complaint";  //data from complaint table
        }
    }  
});

module.exports = router;