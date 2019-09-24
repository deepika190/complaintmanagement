var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
    res.render('adminlogin.ejs', { title: 'adminlogin'});
  });


  
  router.post('/',function(req,res,next){   //<form action="/adminlogin" in .ejs
    var email=req.body.email;
    var psw1=req.body.psw1;
    console.log(email);
    console.log(psw1);
    
    
    let selectquery="SELECT 'admin' as role, email FROM adminlogin WHERE email='"+ email+"' AND admpassword='" + psw1 +"'";
    
    db.query(selectquery, (err,result)=>{
      if(err) throw err;
      console.log("sleect query executed successfully");
      if(result.length==1)  //IF RECORD FOUND
      {  
        req.session.user = result[0];
        res.redirect('/complaintslist');      
      }
      else
      {
        res.render('adminlogin.ejs',{title:'adminlogin'});
      }

    })
});



module.exports = router;