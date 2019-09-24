var express = require('express');
var nodemailer = require('nodemailer');
const uuidv1 = require('uuid/v1');
const querystring = require('querystring');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('resetpassword.ejs', { title: 'resetpassword'});
  });

  router.post('/',function(req,res,next){   //<form action="/adminlogin" in .ejs
  var email=req.body.emailid;
  var psw1=req.body.newpassword;
  var cpasw1=req.body.confirmpassword;
  var uid = req.body.uidhidden;
  console.log(email);
  console.log(psw1);
  console.log(cpasw1);
  console.log(uid);
   
  
        let selectquery="SELECT * FROM resetpassword WHERE emailid='"+ email+"' AND resetlinkid='" + uid +"'";
  
            db.query(selectquery, (err,result)=>{
            if(err) throw err;
            console.log(selectquery);
             if(result.length==1)  //IF RECORD FOUND
             {    
                let update="update users set password='"+ psw1+"' where email='"+ email+"'";  
                db.query(update, (err,result)=>{
                if(err) throw err;
                console.log(update);
                    let deletestmt ="DELETE FROM resetpassword WHERE resetlinkid='" + uid +"'";  
                    db.query(deletestmt, (err,result)=>{
                    if(err) throw err;
                    });
                    console.log(deletestmt);
                res.redirect('/');
                });                       
             }
             else
             {
                 res.redirect('forgotpassword');
             }

         })
          
    
   
});

module.exports = router;