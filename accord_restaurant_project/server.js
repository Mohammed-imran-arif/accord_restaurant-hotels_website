var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();

var port = 5025;

app.set("port",port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "page")))

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname,"page/index.html"))
})

app.post("/reservation",function(req,res){
  console.log(req.body)
  const person_name = req.body.name;
  const person_number = req.body.phone;
  const total_person = req.body.person;
  const res_date = req.body.reservation_date;
  const time = req.body.time;
  const res_emailId = req.body.email_id;
  const message = req.body.message;
  
  console.log(person_name + " " + person_number+" "+total_person+" "+res_date+" "+ time +" "+res_emailId  + " "+message)

  const welcomeMessage = `Hello ${person_name},

🌟 Thank you for making a reservation with us! 🌟 We are looking forward to serving you on ${res_date} at ${time}. 🕒

Here are the details of your reservation:
- Name: ${person_name}
- Contact Number: ${person_number}
- Number of People: ${total_person}
- Reservation Date: ${res_date}
- Time: ${time}

📧 We will be sending you a confirmation email shortly. 📧 If you have any questions or concerns, please feel free to reply to this email or contact us at (123) 456-7890.

🤝 Thank you for choosing us! 🤝 We can't wait to see you soon.

Best regards,
ACCORD RESTAURANT`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'niyasarif97@gmail.com',
      pass: 'mkqg xnma yuff pcbm'
    }
  });

  const mailOptions = {
    from: 'niyasarif97@gmail.com',
    to: res_emailId,
    subject: 'Thank you for subscribing!',
    text: welcomeMessage
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
    res.redirect("/")
  });

})


app.post("/send_email",function(req,res){
    var email = req.body.email_address;
    console.log(email);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'niyasarif97@gmail.com',
          pass: 'mkqg xnma yuff pcbm'
        }
      });
    
      const mailOptions = {
        from: 'niyasarif97@gmail.com',
        to: email,
        subject: 'Thank you for subscribing!',
        text: `Hello there! 👋 Thank you for subscribing to our newsletter! 📩 We're thrilled to have you on board. 🌟 You'll be the first to hear about our latest news, 📢 promotions, 💸 and exclusive offers. 🎁 Stay tuned! 🔜`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
        res.redirect("/")
      });
})

app.listen(port,function(){
  console.log("starting port  " + port)
})

/* mkqg xnma yuff pcbm */