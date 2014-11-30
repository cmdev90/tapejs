/*
 * Created with Sublime Text 2.
 * User: Cherlton Millette
 * Date: 2013-08-19
 * Time: 19:01:53
 * Contact: cherlton.millette@gmail.com
 */

var options = {
    // Server settings.
    dir : __dirname,
    port : 3500,

    // Application settings.
    controllersDir : '/application/controllers', // Address is relative to the root dir.
    modelsDir : '/application/models',
    routesDir: '/application/routes/index.js',
    viewsDir: '/application/views',

    // Database settings.
    database : 'rbm_test',
    username:'root',
    password:'',

    secret : 'my secret!',
    loginURL : '/login',
};


var tape = require('tape')(options);