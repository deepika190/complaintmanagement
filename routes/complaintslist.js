var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

router.get('/', function(req,res,next){
    var currentuser = req.session.user;
    console.log(currentuser);
    let selectquery;
    switch (currentuser.role) {
        case "app": {
                selectquery ="select * from complaint where assignedto='application'";
            break;
        }
        case "tech": {
            selectquery ="select * from complaint where assignedto='technical'";
            //filter = filter + "technical')";
            break;
        }
        case "hr":{
            selectquery="select * from complaint where assignedto='HR'";
            break;
        }

        case "finance":{
          selectquery="select * from complaint where assignedto='finance'";
            break;
        }
        default:{

            
            selectquery="select * from complaint";  //data from complaint table
        }
    }  

    console.log(selectquery);    
    db.query(selectquery,(err,result)=>{
        if(err) throw err;
        console.log("select query executed successfully");
        let usersquery = "select username,uid,email from employeelogin as app where role='app';"+
        " select username,uid,email from employeelogin as finance where role='finance';"+
        " select username,uid,email from employeelogin as hr where role='hr';"+
        " select username,uid,email from employeelogin as tech where role='tech';";
        db.query(usersquery,(err,userres)=>{
          if(err) throw err;
          console.log(userres);
          res.render('complaintslist.ejs',{complaints:result, role:currentuser.role, users: userres}); //that complaint table data will access in tha name of complaints.
        });     
    })
    
}
);

router.post('/',function(req,res,next){
    console.log(req.body.complaintId);
    console.log(req.body.senderName);
    console.log(req.body.senderEmail);
    console.log(req.body.complaint);
    
    let mailTo = req.body.senderEmail;
    let mailBody = req.body.complaint;
    let complaintid=req.body.complaintId;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'deepika.gunti@gmail.com',
          pass: 'Jesussaveus'
        }
      });
      
      var mailOptions = {
        from: 'deepika.gunti@gmail.com',
        to: mailTo,
        subject: 'Sending Email using Node.js',
        text: mailBody
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          
          let updatequery="update complaint set status='MailSent' where complaint_No =" + complaintid + ";";
          console.log(updatequery);
          db.query(updatequery, (err,result)=>{
            if(err) throw err;
            res.redirect('/complaintslist');             
         })
        }
      });
});

router.post('/complaintslist', function(req,res,next){

    
});




module.exports = router;