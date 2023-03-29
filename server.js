const express=require('express');
const https=require('https');
const request=require('request');
const bodyParser = require('body-parser')
const mailchimp = require("@mailchimp/mailchimp_marketing");
// const { response, response } = require('express');
// const { exit } = require('process');
const port=3000
const app=express()
const listId = "37efce0f25";

app.use(bodyParser.urlencoded({extended:true}))


mailchimp.setConfig({
  apiKey: "415bf863dbbda9144879ea1e1ee1ca06-us11",
  server: "us11",
});





app.get('/',(req, res)=>{
    // res.write('Sign Up page')
    res.sendFile(__dirname + '/index.html')
})

app.use(express.static(__dirname)); //NOS PERMITE UTILIZAR css



// POST
app.post('/message', (req, res)=>{
   let userName=req.body.name
   let userLname=req.body.Lname
   let userEmail=req.body.user
   let userPassword=req.body.password
   const subscribingUser = {
    firstName: userName,
    lastName: userLname,
    email: userEmail,
    pass:userPassword
  };
  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
        
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
        PASSWORD: subscribingUser.pass
      }
    });
    
    res.sendFile(__dirname + '/success.html')
    
  }
  // run()
  run().catch(e => res.sendFile(__dirname + "/failure.html"));
    

})
// SE LE DA EL POST A LA PAGINA QUE SE DIRIGE
app.post('/failure', (req, res)=>{
    res.redirect('/')
})


// HEROKU DECIDE EL PUERTO MEDIANTE: process.env.PORT
app.listen(process.env.PORT || 3000, ()=>{
    // console.log(`Example app listening on port ${port}`)
})

// MAILCHIMP API KEY
// 94c69d85c48569134e1f3b91b7799588-us11
// AUDIENCE ID
// 37efce0f25
// SERVER PREFIX
// us11