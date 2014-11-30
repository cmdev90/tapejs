
var Project = {
	attributes : {
		name : Sequelize.STRING,
		duration  : Sequelize.BIGINT,
		description : Sequelize.TEXT
	},

	retrieveAll : function (id, cb) {
		var sequelize = Sequelize.getInstance();

		// sequelize.query("SELECT * FROM projects, objects, project_objects, object_types, object_mappings WHERE projects.id = project_objects.project_id AND project_objects.object_id = objects.id AND ").success(function(results) {
		// 	if (cb === 'function')
		//   		cb(results);
		// });
	
		var query = "SELECT * FROM objects, project_objects, object_types WHERE project_objects.project_id = 1 AND project_objects.object_id = objects.id AND objects.Object_TypeId = object_types.id"

		sequelize.query(query).success(function(myTableRows) {
			if (typeof cb === 'function') {
				cb(myTableRows)
			} else {
				console.log(myTableRows);
			}
		});
	},
};

module.exports = Project;