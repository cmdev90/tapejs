
global.Sequelize = require("sequelize");

module.exports = function (settings){
    var sequelize = new Sequelize(settings.database, settings.username, settings.password);

    // Create an easy way to get the sequelize instance by attaching an 
    // instance function to the global Sequelize object.
    Sequelize.getInstance = function () {
        return sequelize;
    }

    return sequelize;
};