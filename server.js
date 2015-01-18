'use strict';

var express   = require('express'),
    http      = require('http'),
    path 	  = require('path'),
    nodemailer = require("nodemailer"),
    bodyParser = require('body-parser'),
    app       = express(),
	request = require("request"),
	fs = require('fs'),
	email   = require("emailjs/email");



/* EXPRESS CONFIGURATION
 **********************************************************************/

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'dist')));


/* BACKEND SERVICES
 **********************************************************************/

app.get('/api', function(req, res) {
    res.send('THE POLYGLOT API SERVICES RUNNING');
});

 // Create Download Link and Send
app.post('/api/emailUser', function(req, res) {

	res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

	if(req.body.email){
			// Do funky stuff with body
		var server  = email.server.connect({
		   user:     "flapironproductions@gmail.com", 
		   password: "flapironproductions1", 
		   host:     "smtp.gmail.com", 
		   tls: {ciphers: "SSLv3"},
		   timeout: 1000000
		});


        var message = { 
           text: 	"test",
		   from:    req.body.email, 
		   to:      "owain.llew@gmail.com",
		   subject: "The PolyGlot: Form Submission"
		};

		// send the message and get a callback with an error or details of the message that was sent
		server.send(message, function(err, message) { 
			if(err) {
			console.log('error', err);
			} else {
				console.log('Message Sent');
			}

			return message;
		});
	}
});


 /* START SERVER
 **********************************************************************/

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


