
var crypto = require('crypto'),
	_ = require('underscore');

var hash = function (password) {
    var salt = '3EKJ2_@&Ea',
        saltedpassword = password + salt;

    var sha1 = crypto.createHash('sha1').update(saltedpassword),
        hash = sha1.digest("hex");

    return hash;
};

var User = {
	create : function (req, res) {
		var user = {
			firstname : req.param('fname'),
			lastname : req.param('lname'),
			email : req.param('email'),
			password : hash(req.param('password'))
		};

		try {
			Models.User.findOrCreate({email : req.param('email')}, user).success(function (result_User, created) {
				if (created)
					return res.send(result_User);
				return res.send(false);
			});
		} catch (err) {
			return res.send(err);
		}
	},

	retrieve : function (req, res) {
		Models.User.find({where : {id : req.param('id')}}).success(function (result_User){
			if(result_User !== null)
				return res.send(result_User);

			return res.send(false);
		});
	}
};

module.exports = User;