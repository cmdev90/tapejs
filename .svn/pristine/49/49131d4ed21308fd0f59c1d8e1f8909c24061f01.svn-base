
var sequelize = Sequelize.getInstance()
	async = require('async'),
	_ = require('underscore');

var object = {
	
	attributes : {
		name : Sequelize.STRING,
		description : Sequelize.TEXT
	},

	map : function (options, cb){
		sequelize.query("INSERT INTO objectsparent (ObjectId, parentId) VALUES("+options.objectid+", "+options.parentid+")").success(function (result){
			if (typeof cb === 'function')
				cb(true);
		}).error(function(err){
			console.log(err);
		});
	},

	project : function (id, cb) {
		// function globals!
		var project, Outcomes = [];

		// Run query to find project
		sequelize.query("SELECT * FROM `projects` WHERE id = " + id).success(function (result) {
			// If a project was returned by the query
			// get ready to search for objectives connected to project.
			if (result.length > 0) {
				// set the project object as the first element of the result array
				project = result[0];

				// Run the query to find objectives connected to the project.
				sequelize.query("SELECT * FROM `objectives` WHERE parent = " + project.id).success(function (objectives) {

					// If there are objectives attached to this project prepare to 
					// search for outcomes connected to the objectives.
					if (objectives.length > 0) {
						// Set the project objectives to the returned objectives.
						project.objectives = objectives;

						// We need to synchronously search for the outcomes connected to each objective in the database.
						// @objectives  - the list of objectives.
						// @objectivesIterator - the iterator (defined lower down).
						async.each(objectives, objectivesIterator, function(err, done){
							if (err) throw err;

							// Check the function global Outcome object.
							// If there are outcome elements then iterate over them to find
							// the associated outputs.
							if (Outcomes.length > 0) {
								async.each(Outcomes, outcomesIterator, function (){
									if (err) throw err;
									cb(project);
								});
							} else {
								// There are no outcome elements to process so pass
								// control to the callback function with the project object.
								cb(project);
							}
						});
					} else {
						// There are no objectives to just pass the project to 
						// the callback.
						cb(project);
					}

				}).error(function(err){throw err;});
			} else {
				// Project not found so pass control to
				// the callback.
				cb();
			}

		}).error(function(err){throw err;});


		// Privatee helper functions.
		// --------------------------

		var objectivesIterator =  function (item, callback) {
			// Run the query to find outcomes associated with the passed objective.
			sequelize.query("SELECT * FROM `outcomes` WHERE parent = " + item.id)
			.success(function (outcomes){
				// attach the results to the passed objective.
				item.outcomes = outcomes;

				// Attach each outcome to the function global outcome variable
				// so each outcome can be search for outputs.
				_.each(outcomes, function (outcome){
					Outcomes.push(outcome);
				});
				
				// Success so call async callback with null.
				callback(null);

			}).error(function(err){throw err;});
		};

		var outcomesIterator = function (item, callback) {
			// Run the query to find outputs associated with the passed outcome.
			sequelize.query("SELECT * FROM `outputs` WHERE parent = " + item.id)
			.success(function (outputs){
				// attach the results to the passed outcome.
				item.outputs = outputs;
				// Success so call the async callback with null.
				callback(null);
			}).error(function(err){throw err;});
		};
	},

	projects : function (cb) {

		sequelize.query("SELECT * FROM projects").success(function (results){
			cb(results);
		}).error(function (err){
			cb(err);
		});
	},

	delete : function (id, cb) {
		sequelize.query("DELETE FROM `objects` WHERE `objects`.`id` = " + id).success(function (result){
			cb(result);
		}).error(function (err){
			cb(err);
		});
	}
};



module.exports = object;


