'use strict';


module.exports = function(sequelize, DataTypes) {
  var Determination = sequelize.define("determination", {
      DeterminationID: {
        type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
      },
      TimestampCreated: {
        type: DataTypes.DATE,
        allowNull: false,
		  defaultValue:	DataTypes.NOW
      },
      TimestampModified: {
        type: DataTypes.DATE,
        allowNull: false,
		  defaultValue:	DataTypes.NOW
      },
      Version: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CollectionMemberID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      Addendum: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      AlternateName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Confidence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DeterminedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      DeterminedDatePrecision: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      FeatureOrBasis: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      GUID: {
		type: DataTypes.UUID,
		allowNull: true,
		defaultValue: DataTypes.UUIDV1,
      },
      IsCurrent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
		  defaultValue: 1
      },
      Method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      NameUsage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Number1: {
        type: DataTypes.FLOAT(20,10),
        allowNull: true,
      },
      Number2: {
        type: DataTypes.FLOAT(20,10),
        allowNull: true,
      },
      Qualifier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      SubSpQualifier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Text1: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Text2: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      TypeStatusName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      VarQualifier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      YesNo1: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      YesNo2: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      TaxonID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      DeterminerID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
		references: "agent",
		referencesKey: "AgentID"
      },
      CollectionObjectID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      CreatedByAgentID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      PreferredTaxonID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      ModifiedByAgentID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      }
}, {
	tableName: 'determination',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
      associate: function(models) {
	
	models.Determination
		.belongsTo(models.Collectionobject, {
			foreignKey: 'CollectionObjectID'
		});
		
	models.Collectionobject.hasMany(models.Determination);
		
	models.Agent
		.hasMany(models.Determination, {
			foreignKey: 'DeterminerID'
		});
        
      }
	  
	}
});
return Determination;
};
