const Survey = require('../models/Survey');
const User = require('../models/User');
const Question = require('../models/Question');
const url = require('url');
const async = require('async');
const nodemailer = require('nodemailer')
const crypto = require('crypto');
//const sendEmail = require('../public/js/send-email');
var mongoose = require('mongoose');

exports.contact = (req, res) => {
        //Gets the information from the contact form and inserts it into an email
        const output = `<p>You have a new message</p>
                        <h3>Contact Details</h3>
                        <ul>
                          <li>Name: ${req.body.name}</li>
                          <li>Email: ${req.body.email}</li>
                          <li>Phone Number: ${req.body.phone}</li>
                        </ul>
                        <h3>Message</h3>
                        <p>${req.body.message}</p>`;
      
        let transporter = nodemailer.createTransport({
                          host: 'smtp.gmail.com',
                          port: 587,
                          secure: false,  
                          service:'gmail',
                          auth: {
                              user: 'chastainrgm@gmail.com', 
                              pass: 'hususeyrzagvizjr' 
                          }
                      });
                  
                      // setup email data with unicode symbols
        let mailOptions = {
                          from: '"Test App" <chastainrgm@gmail.com>', 
                          to: req.body.posterEmail, 
                          subject: 'Message from your Test App',  
                          html: output // inserts the contact info and message into the email
                      };       
        transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                              return console.log(error);
                          }
                          console.log('Message sent: %s', info.messageId);
                          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      
                          res.render('sent',{
                            title:"Email Confirmed",
                            user: req.user
                          });
                    });
  };


exports.generateLink = (req,res,next) =>{
    async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          /*  Not used for dev
          var smtpTransport = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            //port:25,
            //port:465,
            port:587,
            //port: 25,
            secure: false,  
            //service:'gmail',
            auth: {
                user: 'support@fotio.ca', 
                pass: 'a5516coca33'
                //pass: 'hususeyrzagvizjr' 
            }
        });
        */
            var smtpTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,  
            service:'gmail',
            auth: {
                user: 'chastainrgm@gmail.com', 
                pass: 'xfanlsprutffndsv' 
            }
        });
          var mailOptions = {
            to: req.body.email,
            from: 'support@fotio.ca',
            subject: 'Answer this survey',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              req.body.message + '\n\n' +
              'https://' + req.headers.host + '/answerSurvey/' + req.query.surveyID + '\n\n'
              
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            res.render('surveySent',{
              title:"Email Confirmed",
              user: req.user
            });
            console.log(req);
            done(err, 'done');
          });
        }
      ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
      });
  }