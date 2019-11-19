var express = require('express');
var nodemailer = require('nodemailer');
const uuidv1 = require('uuid/v1');
var router = express.Router();



router.get('/', function(req, res, next) {
    res.render('forgotpassword.ejs', { title: 'forgotpassword',text: ''});
  });

router.post('/',function(req,res,next){
  console.log(req.body.mailto);
  
  let mailTo = req.body.mailto;
  let uid = uuidv1(); 
  let msg = "Email sent to ";
  let selectquery="select email from users where email='"+ mailTo+"'";
  db.query(selectquery, (err,result)=>{
      if(err) throw err;
      console.log(selectquery);
      if(result.length==1)  //IF RECORD FOUND
      {    

      let mailBody = "Click <a href='http://localhost:3000/resetpassword?uid=" + uid +"'>here</a> to reset password ";
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'deepika.gunti@gmail.com',
            pass: 'need to write passwoed'
          }
        });
        
        var mailOptions = {
          from: 'deepika.gunti@gmail.com',
          to: mailTo,
          subject: 'New password',
          text: mailBody
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
              let insertquery = "insert into resetpassword(emailid,resetlinkid) values('"+ mailTo +"' ,'"+ uid +"')"; 
              console.log(insertquery);
              db.query(insertquery, (err, insertquery) => {
                if (err) throw err;
                console.log("One record  added");
                
              }
          );
            console.log('Email sent: ' + info.response);
          }
        });
    
      }
      else
      {
         msg = "Email not registered with us - ";
      }
      res.render("forgotpassword.ejs",{text:msg+mailTo});
    });
  });
    
  module.exports = router;