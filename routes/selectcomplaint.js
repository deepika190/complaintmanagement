var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();



router.post('/', function(req,res,next){
    let selectedoption=req.body.complainttype;
    console.log(selectedoption);
    let selectquery;
   
    switch(selectedoption)
    {
      case "application": {
        selectquery ="select * from complaint where comtype='application'";
      break;
      }
      case "technical": {
        selectquery ="select * from complaint where comtype='technical'";
      break;
      }
      case "HR":{
        selectquery="select * from complaint where comtype='HR'";
      break;
      }
      case "finance":{
        selectquery="select * from complaint where comtype='finance'";
      break;
      }
      default:{
      selectquery="select * from complaint";
      }
       
    }
    console.log(selectquery);
    db.query(selectquery, (err, result) => {
      if (err) throw err;
      console.log("select query is executed successfully");
      res.render('complaintslist.ejs',{complaints:result, role: 'admin'});
    }
    );
  
  });

  
module.exports = router;