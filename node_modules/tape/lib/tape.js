
var Tape = function (settings){
    var that = this;


    global.Controllers = require('./controller')(settings);

    var sequelize = require('./orm')(settings);
    
    global.Models = require('./model')(settings, sequelize);
    

    var server = require('./server')(settings);
    // console.log(server);

    this.start = function (){
        server.start();
    };
};

module.exports = Tape;