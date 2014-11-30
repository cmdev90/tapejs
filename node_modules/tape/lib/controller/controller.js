/*
 *  Controller.js
 *  Cherlton Millette - <cherlton.millette@gmail.com>
 *  28/10/2013
 */
var _ = require('underscore');

var Controller = {
    create : function (options) {
        // Define the default controls that are to be avaliable
        // on each controller.

        // The Controls constructor that holds public referneces to HTTP header
        // objects request (req) and response (res).
        function Controls() {
            this.req = {};
            this.res = {};
        }

        // Use this function to set the HTTP headers for the current
        // request that the controller is to handle.
        Controls.prototype.setHeaders = function (req, res) {
            this.req = req;
            this.res = res;
        };

        // Use this function to call functions added at runtime.
        Controls.prototype.run = function (fn) {
            this[fn].call();
        };

        // Create a new controls object controller to be extended with the options
        // passed.
        var Controller = new Controls();


        // Iterate over the passed object and attach each property
        // to the Controller object and bind the Controller's context
        // to the attached properties to ensure that the 'this'
        // keyword points to the correct context.
        _.each(options, function(value, key){
            Controller[key] = value.bind(Controller);
        });

        // return the new Controller.
        return Controller;
    }
};

// The base "class" of the controller object. Each new controller will be
// and instance of the Controls object and extend to it new functions that 
// will be abel to access all prototype and public "this" properties of 
// the base class controller.
// var Controls = (function (){

//     // Controls constructor that holds public referneces to HTTP header
//     // objects request (req) and response (res).
//     function Controls() {
//         this.req = {};
//         this.res = {};
//     }

//     // Use this function to set the HTTP headers for the current
//     // request that the controller is to handle.
//     Controls.prototype.setHeaders = function (req, res) {
//         this.req = req;
//         this.res = res;
//     };

//     Controls.prototype.run = function (fn) {
//         console.log(this);
//         console.log(fn);
//         console.log(this.__proto__);
//         this[fn].call();
//     };

//     // This function allows the ability for the controls to be extended at runtime
//     // in a programatic manner.
//     Controls.prototype.extend = function (options) {
//         _.extend(this, options);
//     };
//     return Controls;
// })();


// var Controller = {
//     create : function (options) {
//         // create a new controller
//         var controller = new Controls();

//         // Use underscore extend function to add the options
//         // properties to the new controller object.
//         _.each(options, function(value, key){
//             controller.__proto__[key] = value.bind(controller);
//         });

//         // return the new extended controller.
//         return controller;
//     }
// };

module.exports = Controller;