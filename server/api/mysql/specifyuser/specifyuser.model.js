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
		
		
		models.Specifyuser
		  .hasMany(models.Spprincipal, {foreignKey: 'SpecifyUserID' , through: 'specifyuser_spprincipal'});
		models.Spprincipal
		  .hasMany(models.Specifyuser, {foreignKey: 'SpPrincipalID' , through: 'specifyuser_spprincipal'});
		
      }
	  
	},
	instanceMethods: {
		getSpPrincipals: function(models, user) {
			return sequelize
				.query('SELECT c.* FROM specifyuser a JOIN specifyuser_spprincipal b ON a.SpecifyUserID=b.SpecifyUserID  JOIN spprincipal c ON c.SpPrincipalID = b.SpPrincipalID WHERE a.SpecifyUserID =:SpecifyUserID; ',
					models.Spprincipal, {
						raw: true
					}, {
						SpecifyUserID: this.SpecifyUserID
					})
				.then(function(sprincipals) {

					if (user.UserType === "Manager" || user.SpecifyUserID === specifyusers[0].SpecifyUserID) {

						return sequelize.Promise.resolve("Access granted")
					} else {

						return sequelize.Promise.reject("I'm afraid I can't let you do that!")
					}

				})
		}
	}
});
return Specifyuser;
};

