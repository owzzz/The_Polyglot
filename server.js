'use strict';

var express   = require('express'),
    http      = require('http'),
    path 	  = require('path'),
    nodemailer = require("nodemailer"),
    bodyParser = require('body-parser'),
    app        = express(),
	request	   = require("request"),
	fs 		   = require('fs'),
	email      = require("emailjs/email");



/* EXPRESS CONFIGURATION
 **********************************************************************/

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


/* BACKEND SERVICES
 **********************************************************************/

app.get('/api', function(req, res) {
    res.send('THE POLYGLOT API SERVICES RUNNING');
});

 // Create Download Link and Send
app.post('/api/emailUser', function(req, res) {

	if(req.body){
			// Do funky stuff with body
		var server  = email.server.connect({
		   user:     "thepolyglot2015@gmail.com", 
		   password: "Owain2015", 
		   host:     "smtp.gmail.com", 
		   tls: {ciphers: "SSLv3"},
		   timeout: 1000000
		});


        var message = { 
           text: 	req.body.help,
		   from:    req.body.email, 
		   to:      "otaviobarbon@gmail.com",
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


