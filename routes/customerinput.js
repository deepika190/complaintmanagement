var express = require('express');
var router = express.Router();



router.get('/', function(req,res,next){
    res.render('Customerinput.ejs', {title: 'customer input'});
}
);

router.post('/', function(req,res,next){
    
    let username=req.body.username;
    let email=req.body.email;
    let selectedoption=req.body.radiobutton;
    let complainttype=req.body.complainttype;
    
    let message=req.body.textarea;
    console.log(req.body.username);  
    console.log(req.body.email);
    console.log(selectedoption);
    console.log(message);
    console.log(complainttype);
    

    if (selectedoption=="feedback"){
    let insertquery = "insert into feedback(fsender,femail,ftext) values('"+ username +"' ,'" + email + "', '" + message + "')"; 
        console.log(insertquery);
        db.query(insertquery, (err, insertquery) => {
          if (err) throw err;
          console.log("Feed back is stored");
          console.log("u r Feedback is sent");

          res.render('Customerinput.ejs');
        }
        );}

    if(selectedoption=="suggestion")
    {
      let insertquery= "insert into suggestion(ssender,semail,stext) values ('"+ username +"','"+ email +"','"+ message +"')";
      console.log(insertquery);
      db.query(insertquery,(err, insertquery) =>{
        if(err) throw err;
        console.log("suggestion is stored");
        res.render('customerinput.ejs');
      }
      );
      
    }
    
    if(selectedoption=="complaint")
    {
      let insertquery="insert into complaint(dateraised,comsender,commail,comtext,comtype,status) value(CURRENT_TIMESTAMP(),'"+username+"','"+email+"','"+message+"','"+complainttype+"','Pending')" ;
      console.log(insertquery);
      db.query(insertquery,(err, insertquery) =>{
        if(err) throw err;
        console.log("complaint is stored");
        res.render('customerinput.ejs');
      }
      );

    }
    
  }
  
);

  
module.exports = router;