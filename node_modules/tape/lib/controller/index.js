
var fs = require('fs'),
    _ = require('underscore'),
    Controller = require('./controller.js');


var valid = function (filename) {
    // split by '.' to separate the file name from its extention
    var parts = filename.split('.');

    // There should be 2 parts to the file name i.e. the file name 
    // and the extention. If there is < 2 parts (i.e. 1 or 0) assume 
    // this to be a folder and return false.
    if(parts.length < 2)
        return false;

    // Else return the file name.
    return parts[0];
};


module.exports = function (settings) {
    var files,
        Controllers = {},
        controllerDir = settings.dir + settings.controllersDir; // = {};

    console.log('\nReading Controllers directory @ ' + controllerDir);
    files = fs.readdirSync(controllerDir);
    
    // Load each valid file into the Controller object.
    _.each(files, function (filename) {
        var name;

        if(name = valid(filename)){
            console.log('Loading Controller ' + filename);
            var extention = require(controllerDir + '/' + filename);
            Controllers[name] = Controller.create(extention);
        }
    });

    // console.log(Controllers);
    // Return all the controllers.
    return Controllers;

};


