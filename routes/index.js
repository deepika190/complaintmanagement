var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Login' , email: 'Email Address'});
});

router.post('/signup', function(req, res, next){  //<form action="/signup"  in .ejs
    let username1=req.body.username1;
    let phno=req.body.usrtel;
    let email=req.body.email;
    let password=req.body.psw;
            
    let insertquery = "insert into users(username,phno,email,password,role) values('"+ username1 +"' ,'"+ phno +"','" + email + "', '" + password + "','user')"; 
        console.log(insertquery);
        db.query(insertquery, (err, insertquery) => {
          if (err) throw err;
          console.log("One recore is added");
          res.render('index.ejs',{email: email});
        }
        );
        
  });
  

router.post('/signin',function(req,res,next){   //<form action="/signin" in .ejs
    var email1=req.body.email1;
    var psw1=req.body.psw1;
    let selectquery="SELECT username,phno,email,'user' as role FROM USERS WHERE email='"+ email1+"' AND password='" + psw1 +"'";
    db.query(selectquery, (err,result)=>{
      if(err) throw err;
      console.log("sleect query executed successfully");
      if(result.length==1)
      {  //IF RECORD FOUND
        if(result[0].role == 'user')
        {
          req.session.user = result[0];
          console.log(req.session.user);
          res.redirect('Customerinput');
        }
      }
      else
      {
        res.render('index.ejs',{ email:email1});
      }

    })
});


module.exports = router;