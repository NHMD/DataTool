'use strict';


module.exports = function(sequelize, DataTypes) {
  var Spprincipal = sequelize.define("spprincipal", {
	SpPrincipalID: {
		type: DataTypes.INTEGER,
		primaryKey: true
	},
    TimestampCreated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    TimestampModified: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Version: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    GroupSubClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Priority: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    Remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    CreatedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    userGroupScopeID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
		references: "collection", // notice the plural, it's the name of the table
		referencesKey: "UserGroupScopeID"
    },
    ModifiedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
	
}, {
	tableName: 'spprincipal',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
        associate: function(models) {
        
  		models.Collection
  		  .hasOne(models.Spprincipal, {foreignKey: 'userGroupScopeID'});
  		models.Spprincipal
  		  .belongsTo(models.Collection, {foreignKey: 'UserGroupScopeID'});
		
        }
	  
	}
});
return Spprincipal;
};

