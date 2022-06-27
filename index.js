const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'macosgithub@gmail.com',
    pass: 'rroxwigfhqllsxxo'
  }
});

var mailOptions;
app.get('/', (req, res) => {
    mailOptions = {
        from: 'macosgithub@gmail.com',
        to: req.query.to,
        subject: req.query.subject,
        text: req.query.text
      };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
        res.send({success:false});
    } else {
        console.log('Email sent: ' + info.response);
        res.send({success:true})
    }
    });
      
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
