
var express = require('express'),
    http = require('http'),
    path = require('path'),
    _ = require('underscore');

var app = express();
var httpServer = http.createServer(app);

module.exports = function (settings) {

    var router = require('./router')(settings);

    app.set('port', process.env.PORT || settings.port);
    app.set('views', settings.dir + settings.viewsDir);
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));    
    app.use(express.bodyParser()); 
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret : 'your secret here'})); 
    app.use(app.router);
    app.use(require('stylus').middleware(settings.dir + '/public'));
    app.use(express.static(path.join(settings.dir, 'public')));

    // Development only.
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    // Set the routes from the router to the express app
    router.set(app);


    // Return the servers start function to be called by the calling function 
    // when the application has been loaded and ready to be served.
    return {
        start : function () {
            httpServer.listen(app.get('port'), function(){
                console.log('Express server listening on port ' + app.get('port') );
            });   
        },

        getServer : function () {
            return httpServer;
        }
    };
};