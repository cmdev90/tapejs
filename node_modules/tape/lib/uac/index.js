var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , _ = require('underscore')
  , LocalStrategy = require('passport-local').Strategy
  , async = require('async');
  
var UAC = function (app, options, server) {
	// var pipe = require('pipe')(server);

	if(options && options.secret) {

		function findById(id, fn) {
			Models.User.find({where : {'id' : id}}).success(function (user){
				return fn(null, user);
			}).error(function (err){
				fn(new Error('User ' + id + ' does not exist'));;
			});
		}

		function findByUsername(username, fn) {
			Models.User.find({where : {email : username}}).success(function (user){
				return fn(null, user);
			}).error(function (err){
				return fn(null, null);
			});
		}


		// Passport session setup.
		//   To support persistent login sessions, Passport needs to be able to
		//   serialize users into and deserialize users out of the session.  Typically,
		//   this will be as simple as storing the user ID when serializing, and finding
		//   the user by ID when deserializing.
		passport.serializeUser(function(user, done) {
		  done(null, user.id);
		});

		passport.deserializeUser(function(id, done) {
		  findById(id, function (err, user) {
		    done(err, user);
		  });
		});


		// Use the LocalStrategy within Passport.
		//   Strategies in passport require a `verify` function, which accept
		//   credentials (in this case, a username and password), and invoke a callback
		//   with a user object.  In the real world, this would query a database;
		//   however, in this example we are using a baked-in set of users.
		passport.use(new LocalStrategy(
		  function(username, password, done) {
		  	password = Controllers.user.hash(password);
		    // asynchronous verification, for effect...
		    process.nextTick(function () {
		      // Find the user by username.  If there is no user with the given
		      // username, or the password is not correct, set the user to `false` to
		      // indicate failure and set a flash message.  Otherwise, return the
		      // authenticated `user`.
		      findByUsername(username, function(err, user) {
		        if (err) { return done(err); }
		        if (!user) { return done(null, false/*, { message: 'Unknown user ' + username }*/); }
		        if (user.password != password) { return done(null, false/*, { message: 'Invalid password' }*/); }
		        return done(null, user);
		      });

		    });
		  })
		);

		// configure Express
		app.configure(function() {
		  // Initialize Passport!  Also use passport.session() middleware, to support
		  // persistent login sessions (recommended).
		  app.use(passport.initialize());
		  app.use(passport.session());
		});

		// POST /login
		//   Use passport.authenticate() as route middleware to authenticate the
		//   request.  If authentication fails, the user will be redirected back to the
		//   login page.  Otherwise, the primary route function function will be called,
		//   which, in this example, will redirect the user to the home page.
		//
		//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
		app.post('/login', function(req, res, next) {
		  passport.authenticate('local', function(err, user, info) {
		    if (err) { 
	        	// pipe.push({
	         //        title: 'Access Denied!',
	         //        type : 'error',
	         //        timeout : 50000,
	         //        message: 'Invalid username or password.'
	         //    },1500);
		    	return res.redirect('/login'); 
		    }

		    if (!user) {
	        	// pipe.push({
	         //        title: 'Access Denied!',
	         //        type : 'error',
	         //        timeout : 50000,
	         //        message: 'Invalid username or password.'
	         //    },1500);
		    	return res.redirect('/login'); 
		    }

		    req.logIn(user, function(err) {
				if (err) { 
		        	// pipe.push({
		         //        title: 'Access Denied!',
		         //        type : 'error',
		         //        timeout : 50000,
		         //        message: 'Invalid username or password.'
		         //    },1500);
					return res.redirect('/login'); 
				} else {

					Models.UserLog.log({
						userid : user.id,
						action : "user login",
					});
					
					res.redirect('/');
					// pipe.push({
					//     title: 'Welcome back!',
					//     type : 'success',
					//     timeout : 50000,
					//     message: 'Welcome back '+user.firstname+' '+ user.lastname+' to the M&E system.'
					// });
					return;
				}
		    });

		  })(req, res, next);
		});
		// app.post('/login',
		//   passport.authenticate('local', { failureRedirect: '/login'}),
		//   function(req, res) {
		//   	console.log(req.user);
		// 	pipe.push({
  //               title: 'Welcome back!',
  //               type : 'success',
  //               timeout : 50000,
  //               message: 'Welcome back '+req.user.firstname+' '+ req.user.lastname+' to the M&E system.'
  //           }, 3000);
		//     res.redirect('/');
  //   //     	pipe.push({
  //   //             title: 'Access Denied!',
  //   //             type : 'error',
  //   //             timeout : 50000,
  //   //             message: 'Invalid username or password.'
  //   //         }, 3000); 
		//   });


		app.get('/logout', function(req, res){
		  req.logout();
		  res.redirect('/');
		});


		return {
			passport : passport,

			// Simple route middleware to ensure user is authenticated.
			//   Use this route middleware on any resource that needs to be protected.  If
			//   the request is authenticated (typically via a persistent login session),
			//   the request will proceed.  Otherwise, the user will be redirected to the
			//   login page.
			isAuth : function ensureAuthenticated (req, res, next) {
			  if (req.isAuthenticated()) { return next(); }
			  res.redirect('/login')
			},

			// Returns a custom function that will check the permissions of the use.
			getPermissions : function (permissions){
				return function (req, res, next) {
					var per = permissions;

					var result = false;
					async.each(per, function(item, cb) {
						console.log(item);
						console.log(req.user.level === item);
						if (req.user.level === item){
							result = true;
						}

						cb(null);
					}, function (err){
						if(result) {
							return next();
						} else {
							backURL = req.header('Referer') || '/';
							console.log(req.user.level);
							res.redirect(backURL);
							pipe.push({
				                title: 'Access Denied!',
				                type : 'error',
				                timeout : 50000,
				                message: 'You do not have the clerance to access this page.'
				            });
						}
					});
				}
			},
			
		};

	} else {
		throw new Error("UAC not set properly. Ensure you specify a secret in the options file.");
	}
};


module.exports = UAC;
