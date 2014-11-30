
var _ = require('underscore');
var routes;


var load = function (settings) {
    var routes,
        routesDir = settings.dir + settings.routesDir;

    console.log('\nLoading Routes dirctory @ ' + routesDir);
    routes = require(routesDir);

    return routes;
};


var Router = function (settings) {
    routes = this.routes = load(settings);
};


var execute = function (options, req, res) {
    if (options.view) {
        res.render(options.file, {params : options.params});
    } else {
        
        Controllers[options.controller].setHeaders(req, res);

        Controllers[options.controller].run([options.function]);
        
        // if (typeof cf === 'function') {
        //     cf(req, res);
        // } else {
        //     console.log('controller or method not defined');
        //     console.log(options);
        // }
    }
};


var attach = function (method, routes, express, uac) {
    var method = method.toLowerCase();
    _.each(routes, function (properties, route){
        var props = properties;
        if (props.protected && uac) {
            if (props.permissions) {
                // get the custome permission callback functions
                var per = uac.getPermissions(props.permissions); 

                // Attach this function to the routes callback chain!
                express[method](route, uac.isAuth, per, function (req, res){
                    execute(props, req, res);
                });                  
            } else {
                express[method](route, uac.isAuth, function (req, res){
                    execute(props, req, res);
                });                
            }
        } else {
            express[method](route, function (req, res){
                execute(props, req, res);
            });
        }
        console.log(method.toUpperCase() + " " + route);
    });

};


Router.prototype.set = function (express, uac) {
    console.log("Attaching....");
    _.each(routes, function (routes, method){
        attach(method, routes, express, uac);
    });
};

module.exports = function (settings) {
    return new Router(settings);
};


