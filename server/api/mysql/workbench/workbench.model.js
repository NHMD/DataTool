"use strict";


module.exports = function(sequelize, DataTypes) {
  var Workbench = sequelize.define("workbench", {
	"WorkbenchID": {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement:true, 
		allowNull:false
	},
    "TimestampCreated": {
      type: DataTypes.DATE,
      allowNull: false,
    },
    "TimestampModified": {
      type: DataTypes.DATE,
      allowNull: true,
    },
    "Version": {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    "AllPermissionLevel": {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    "TableID": {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    "ExportInstitutionName": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "ExportedFromTableName": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "FormId": {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    "GroupPermissionLevel": {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    "LockedByUserName": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "Name": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "OwnerPermissionLevel": {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    "Remarks": {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    "SrcFilePath": {
      type: DataTypes.STRING,
      allowNull: true,
    },
    "CreatedByAgentID": {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    "SpPrincipalID": {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    "SpecifyUserID": {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    "WorkbenchTemplateID": {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    "ModifiedByAgentID": {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
}, {
	tableName: 'workbench',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
			models.Workbenchrow
				.belongsTo(models.Workbench, {
					foreignKey: "WorkbenchID"
				});
			models.Workbench
				.hasMany(models.Workbenchrow, {
					foreignKey: "WorkbenchID"
				});
			models.Workbench
				.hasOne(models.Workbenchtemplate, {
					foreignKey: "WorkbenchTemplateID"
				});

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
return Workbench;
};

