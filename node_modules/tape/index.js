

var Tape = require('./lib/tape.js');



module.exports = function(settings) {
    var tape = new Tape(settings);

    tape.start();
};

