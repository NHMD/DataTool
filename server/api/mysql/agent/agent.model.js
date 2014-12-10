'use strict';


module.exports = function(sequelize, DataTypes) {
  var Agent = sequelize.define("agent", {
	"AgentID": {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	"TimestampCreated": DataTypes.DATE,
	"TimestampModified": DataTypes.DATE,
	"DivisionID": DataTypes.INTEGER,
	"Email": DataTypes.STRING,
	"FirstName":DataTypes.STRING,
	"GUID":DataTypes.UUID,
	"Initials":DataTypes.STRING,
	"Interests":DataTypes.STRING,
	"JobTitle":DataTypes.STRING,
	"LastName":DataTypes.STRING,
	"MiddleInitial":DataTypes.STRING,
	"Abbreviation": DataTypes.STRING,
	"SpecifyUserID": DataTypes.INTEGER
}, {
	tableName: 'agent',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
      associate: function(models) {
       // Agent.hasMany(models.Workbenchtemplate)
      }
	  
	}
});
return Agent;
};
