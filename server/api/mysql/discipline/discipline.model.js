"use strict";


module.exports = function(sequelize, DataTypes) {
  var Discipline = sequelize.define("discipline", {
	UserGroupScopeId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement:true, 
		allowNull:false
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
    ModifiedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    CreatedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    disciplineId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    IsPaleoContextEmbedded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PaleoContextChildTable: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RegNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TaxonTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    LithoStratTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    DataTypeID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    GeographyTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    GeologicTimePeriodTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    DivisionID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    }
   
}, {
	tableName: 'discipline',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
			
		},
	authorize: function(models, user) {
		return sequelize.Promise.resolve("Access granted");
		
	}
	  
	}
});
return Discipline;
};

