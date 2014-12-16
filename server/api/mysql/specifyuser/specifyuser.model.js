'use strict';


module.exports = function(sequelize, DataTypes) {
  var Specifyuser = sequelize.define("specifyuser", {
	"SpecifyUserID": {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
	"TimestampCreated": DataTypes.DATE,
	"TimestampModified": DataTypes.DATE,
	"EMail": DataTypes.STRING,
	"Name":DataTypes.STRING,
	"UserType":DataTypes.STRING,
	"LoginCollectionName": DataTypes.STRING,
	
}, {
	tableName: 'specifyuser',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
      associate: function(models) {
        models.Specifyuser
		  .hasMany(models.Workbenchtemplate, {foreignKey : 'SpecifyUserID'});
		 models.Workbenchtemplate
		  .hasMany(models.Workbenchtemplatemappingitem, { foreignKey : "WorkbenchTemplateID" });
		 models.Workbenchtemplatemappingitem
		  .hasMany(models.Workbenchdataitem, { foreignKey : "WorkbenchDataItemID" });
		 
        models.Specifyuser
		  .hasMany(models.Workbench, {foreignKey : 'SpecifyUserID'}); 
		 
      }
	  
	}
});
return Specifyuser;
};

