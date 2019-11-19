var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
    res.render('addnewemployee.ejs', { title: 'addnewemployee'});
  });



router.post('/',function(req,res,next){

  let username1=req.body.username;
  let phno=req.body.phno;
  let email=req.body.email;
  let password=req.body.password;
  let role=req.body.Role;
          
  let insertquery = "insert into employeelogin(username,phno,email,password,role) values('"+ username1 +"' ,'"+ phno +"','" + email + "', '" + password + "','"+ role + "')"; 
      console.log(insertquery);
      db.query(insertquery, (err, insertquery) => {
        if (err) throw err;
        console.log("One recore is added");
        res.render('index.ejs',{email: email});
      }
      );
        

        });

  module.exports = router;
