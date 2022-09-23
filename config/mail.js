var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'dixit.local@gmail.com', // TODO: your gmail account
      pass: 'nncomitistqomvao' // TODO: your gmail password
  }
});

function Mail() {

  this.sendHtml = function(mailFrom, mailTo, subject, html, callback) {
    transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      html: html,
    }, function(err){
      if(err){
        console.error(err);
      }
    });
  }
}

module.exports = new Mail();
