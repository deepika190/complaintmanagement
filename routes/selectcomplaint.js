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
      if(err) throw err;
        console.log("select query executed successfully");
        let usersquery = "select username,uid,email from employeelogin as app where role='app';"+
        " select username,uid,email from employeelogin as finance where role='finance';"+
        " select username,uid,email from employeelogin as hr where role='hr';"+
        " select username,uid,email from employeelogin as tech where role='tech';";
        db.query(usersquery,(err,userres)=>{
          if(err) throw err;
          console.log(userres);
          res.render('complaintslist.ejs',{complaints:result, role:'admin', users: userres}); //that complaint table data will access in tha name of complaints.
        });    
    }
    );
  
  });

  
module.exports = router;