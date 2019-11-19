var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {

    res.render('employeecomplaints.ejs', { title: 'employeecomplaints', complaints: {}});
  });


  
router.post('/',function(req,res,next){   //<form action="/adminlogin" in .ejs
  var email=req.body.email;
  var psw1=req.body.psw1;
  console.log(email);
  console.log(psw1);
  
    
  let selectquery="SELECT role,email FROM employeelogin WHERE email='"+ email+"' AND password='" + psw1 +"'";
  
  db.query(selectquery, (err,result)=>{
    if(err) throw err;
    console.log("select query executed successfully");
    req.session.user = result[0];
    if(result.length==1)  //IF RECORD FOUND
    {  
      res.redirect('/employeecomplaints');      
    }
    else
    {
      res.render('employeelogin.ejs',{title:'employeelogin'});
    }

  })
});

module.exports = router;
