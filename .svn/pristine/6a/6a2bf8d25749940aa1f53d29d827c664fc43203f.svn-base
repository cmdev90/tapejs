
// You can place private helper functions out here!


var Project = {

	findOne : function (req, res) {
		Models.Object.project(req.param('id'), function (project){
			res.render('projects',{project : project});
		});
	},

	findAll : function (req, res) {
		Models.Object.projects(function (projects) {
			res.render('project', {projects : projects});
		});
	},

	delete : function (req, res) {
		Models.Object.delete(req.param('id'), function (project){
			res.send(project);
		});
	},

	create_project : function (req, res) {
		var project = {
			name : req.body.name,
			description : req.body.description,
			Object_TypeId : 4
		};

		console.log(req.body);
		console.log(project);

		Models.Object.create(project).success(function (result) {
			return res.send(result);
		});

	},

	create_objective : function (req, res) {
		var objective = {
			name : req.param('name'),
			description : req.param('description'),
			Object_TypeId : 1 // set this here as this is the default for objectives
		};

		console.log(req.body.name);
		console.log(objective);

		res.send(objective);

		// Models.Object.create(objective).success(function (result) {
		// 	Models.Object.map({
		// 		objectid : result.id,
		// 		parentid : req.param('id')
		// 	}, function (result2){
		// 		return res.send(result);
		// 	});
		// });

	},

	create_outcome : function (req, res) {
		var objective = {
			name : req.param('name'),
			description : req.param('description'),
			Object_TypeId : 2 // set this here as this is the default for objectives
		};

		Models.Object.create(objective).success(function (result) {
			Models.Object.map({
				objectid : result.id,
				parentid : req.param('id')
			}, function (result2){
				return res.send(result);
			});
		});
	},

	create_output : function (req, res) {
		var objective = {
			name : req.param('name'),
			description : req.param('description'),
			Object_TypeId : 3 // set this here as this is the default for objectives
		};

		Models.Object.create(objective).success(function (result) {
			Models.Object.map({
				objectid : result.id,
				parentid : req.param('id')
			}, function (result2){
				return res.send(result);
			});
		});
	},

};

module.exports = Project;

