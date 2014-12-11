"use strict";


module.exports = function(sequelize, DataTypes) {
  var Workbenchtemplate = sequelize.define("workbenchtemplate", {
	"WorkbenchTemplateID": {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement:true, 
		allowNull:false
	},
	"TimestampCreated": DataTypes.DATE,
	"TimestampModified": DataTypes.DATE,
	"Name": DataTypes.STRING,
	"Remarks": DataTypes.TEXT,
	"SpecifyUserID": DataTypes.INTEGER
}, {
	tableName: 'workbenchtemplate',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
      associate: function(models) {
       
      },
	authorize: function(models, user) {

				if (user.UserType === "Manager" || user.SpecifyUserID === this.SpecifyUserID) {

					return sequelize.Promise.resolve("Access granted")
				} else {

					return sequelize.Promise.reject("I'm afraid I can't let you do that!")
				}

	}
	  
	}
});
return Workbenchtemplate;
};

