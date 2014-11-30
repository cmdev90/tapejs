var fs = require('fs'),
    _ = require('underscore');
    


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


module.exports = function (settings, sequelize) {
    var files,
        Models = {},
        modelsDir = settings.dir + settings.modelsDir;

    console.log("\nReading Models directory @ " + modelsDir);
    files = fs.readdirSync(modelsDir),

    _.each(files, function (filename) {
        var name;
        if(name = valid(filename)) {
            console.log('Loading Model ' + filename);

            var model = require(modelsDir + '/' + filename),
                attributes = model.attributes || {}, 
                extention = {};

            extention.classMethods = _.omit(model, 'attributes');

            Models[name] = sequelize.define(name.toLowerCase(), attributes, extention);

            Models[name].sync().success(function (){
                console.log("Sync table success!");
            }).error(function (error){
                throw error
            });
        }
    });

    return Models;

};
