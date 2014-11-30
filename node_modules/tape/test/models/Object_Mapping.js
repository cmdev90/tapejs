
var Object_Mapping = {

	attributes : {

		parent_id : {
			type : Sequelize.BIGINT,
			primaryKey: true
		},

		child_id : {
			type : Sequelize.BIGINT,
			primaryKey: true
		}

	}

};

module.exports = Object_Mapping;

