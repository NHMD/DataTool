'use strict';


module.exports = function(sequelize, DataTypes) {
  var Preparation = sequelize.define("preparation", {
      PreparationID: {
        type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
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
      CollectionMemberID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      CountAmt: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Integer1: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      Integer2: {
        type: DataTypes.INTEGER(11),
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
      PreparedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      PreparedDatePrecision: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      Remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ReservedInteger3: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      ReservedInteger4: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      SampleNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      StorageLocation: {
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
      YesNo1: {
        type: 'BIT(1)',
        allowNull: true,
      },
      YesNo2: {
        type: 'BIT(1)',
        allowNull: true,
      },
      YesNo3: {
        type: 'BIT(1)',
        allowNull: true,
      },
      CreatedByAgentID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CollectionObjectID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      ModifiedByAgentID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      PrepTypeID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      StorageID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      PreparationAttributeID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      PreparedByID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      }
}, {
	tableName: 'preparation',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
      associate: function(models) {
       // Preparation.hasMany(models.Workbenchtemplate)
      }
	  
	}
});
return Preparation;
};
